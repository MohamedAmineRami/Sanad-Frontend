import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthState, User, LoginRequest, RegisterRequest } from '../types/auth-types';
import ApiService from '../services/api';

interface AuthContextType extends AuthState {
    login: (credentials: LoginRequest) => Promise<void>;
    register: (userData: RegisterRequest) => Promise<void>;
    logout: () => Promise<void>;
    checkAuthState: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthAction =
    | { type: 'SET_LOADING'; payload: boolean }
    | { type: 'LOGIN_SUCCESS'; payload: { user: User; token: string; refreshToken: string } }
    | { type: 'LOGOUT' }
    | { type: 'UPDATE_USER'; payload: User };

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case 'SET_LOADING':
            return { ...state, isLoading: action.payload };
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                refreshToken: action.payload.refreshToken,
                isAuthenticated: true,
                isLoading: false,
            };
        case 'LOGOUT':
            return {
                user: null,
                token: null,
                refreshToken: null,
                isAuthenticated: false,
                isLoading: false,
            };
        case 'UPDATE_USER':
            return { ...state, user: action.payload };
        default:
            return state;
    }
};

const initialState: AuthState = {
    user: null,
    token: null,
    refreshToken: null,
    isAuthenticated: false,
    isLoading: true,
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    // Storage keys
    const STORAGE_KEYS = {
        TOKEN: '@sanad_token',
        REFRESH_TOKEN: '@sanad_refresh_token',
        USER: '@sanad_user',
    };

    // Store authentication data
    const storeAuthData = async (token: string, refreshToken: string, user: User) => {
        try {
            await AsyncStorage.multiSet([
                [STORAGE_KEYS.TOKEN, token],
                [STORAGE_KEYS.REFRESH_TOKEN, refreshToken],
                [STORAGE_KEYS.USER, JSON.stringify(user)],
            ]);
        } catch (error) {
            console.error('Error storing auth data:', error);
        }
    };

    // Clear authentication data
    const clearAuthData = async () => {
        try {
            await AsyncStorage.multiRemove([
                STORAGE_KEYS.TOKEN,
                STORAGE_KEYS.REFRESH_TOKEN,
                STORAGE_KEYS.USER,
            ]);
        } catch (error) {
            console.error('Error clearing auth data:', error);
        }
    };

    // Check authentication state on app start
    const checkAuthState = async () => {
        try {
            dispatch({ type: 'SET_LOADING', payload: true });

            const [[, token], [, refreshToken], [, userData]] = await AsyncStorage.multiGet([
                STORAGE_KEYS.TOKEN,
                STORAGE_KEYS.REFRESH_TOKEN,
                STORAGE_KEYS.USER,
            ]);

            if (token && refreshToken && userData) {
                const user = JSON.parse(userData);

                // Set token in API service
                ApiService.setToken(token);

                // TODO: Verify token is still valid
                // For now, we'll assume it's valid if it exists
                dispatch({
                    type: 'LOGIN_SUCCESS',
                    payload: { user, token, refreshToken },
                });
            }
        } catch (error) {
            console.error('Error checking auth state:', error);
        } finally {
            dispatch({ type: 'SET_LOADING', payload: false });
        }
    };

    // Login function
    const login = async (credentials: LoginRequest) => {
        try {
            dispatch({ type: 'SET_LOADING', payload: true });

            const response = await ApiService.login(credentials);

            // Store auth data
            await storeAuthData(response.token, response.refreshToken, response.user);

            // Set token in API service
            ApiService.setToken(response.token);

            dispatch({
                type: 'LOGIN_SUCCESS',
                payload: {
                    user: response.user,
                    token: response.token,
                    refreshToken: response.refreshToken,
                },
            });
        } catch (error) {
            dispatch({ type: 'SET_LOADING', payload: false });
            throw error;
        }
    };

    // Register function
    const register = async (userData: RegisterRequest) => {
        try {
            dispatch({ type: 'SET_LOADING', payload: true });

            const response = await ApiService.register(userData);

            // Store auth data
            await storeAuthData(response.token, response.refreshToken, response.user);

            // Set token in API service
            ApiService.setToken(response.token);

            dispatch({
                type: 'LOGIN_SUCCESS',
                payload: {
                    user: response.user,
                    token: response.token,
                    refreshToken: response.refreshToken,
                },
            });
        } catch (error) {
            dispatch({ type: 'SET_LOADING', payload: false });
            throw error;
        }
    };

    // Logout function
    const logout = async () => {
        try {
            // Call logout endpoint if authenticated
            if (state.token) {
                try {
                    await ApiService.logout();
                } catch (apiError) {
                    // Log the API error but don't throw it - we still want to logout locally
                    console.error('Logout API call failed:', apiError);
                    // Continue with local logout even if API call fails
                }
            }
        } catch (error) {
            console.error('Unexpected logout error:', error);
            // Continue with local logout even if there's an unexpected error
        } finally {
            // Always clear local data regardless of API call success/failure
            await clearAuthData();
            ApiService.setToken(null);
            dispatch({ type: 'LOGOUT' });
        }
    };

    // Check auth state on mount
    useEffect(() => {
        checkAuthState();
    }, []);

    const value: AuthContextType = {
        ...state,
        login,
        register,
        logout,
        checkAuthState,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};