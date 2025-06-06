
export interface User {
    id: string;
    name: string;
    email: string;
    photoURL?: string;
    totalDonated: number;
    donationsCount: number;
}

export interface AuthResponse {
    token: string;
    refreshToken: string;
    tokenType: string;
    expiresIn: number;
    user: User;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
}

export interface AuthState {
    user: User | null;
    token: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
}