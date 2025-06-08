import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    SafeAreaView,
    Image,
    TextInput,
    Alert,
    ActivityIndicator,
    ImageBackground, // Add this import
} from 'react-native';
import { COLORS, FONTS, SIZES, SHADOWS } from '../utils/constants';
import { NavigationProps } from '../types/navigation-types';
import { useAuth } from '../context/AuthContext';

const LoginScreen = ({ navigation }: NavigationProps<'Login'>) => {
    const [showEmailLogin, setShowEmailLogin] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [isEmailLoading, setIsEmailLoading] = useState(false);

    const { login } = useAuth();

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleEmailLogin = async () => {
        if (!formData.email.trim() || !formData.password.trim()) {
            Alert.alert('Error', 'Por favor completa todos los campos');
            return;
        }

        try {
            setIsEmailLoading(true);
            await login({
                email: formData.email.trim().toLowerCase(),
                password: formData.password,
            });
        } catch (error: any) {
            Alert.alert('Inicio de Sesión Fallido', error.message || 'Por favor intenta de nuevo');
        } finally {
            setIsEmailLoading(false);
        }
    };

    if (showEmailLogin) {
        return (
            <ImageBackground
                source={require('../assets/background-image.png')} // Replace it with your image path
                style={styles.backgroundImage}
                resizeMode="cover"
            >
                <SafeAreaView style={styles.containerWithBg}>
                    <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

                    {/* Header */}
                    <View style={styles.header}>
                        <TouchableOpacity
                            style={styles.backButton}
                            onPress={() => setShowEmailLogin(false)}
                        >
                            <Text style={styles.backButtonText}>←</Text>
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>Iniciar Sesión</Text>
                    </View>

                    {/* Logo */}
                    <View style={styles.logoContainer}>
                        <Image
                            source={require('../assets/bird-logo.png')}
                            style={styles.logo}
                            resizeMode="contain"
                        />
                        <Text style={styles.mainTextWithBg}>¡Bienvenido de Nuevo!</Text>
                        <Text style={styles.subTextWithBg}>Inicia sesión para continuar</Text>
                    </View>

                    {/* Email Login Form */}
                    <View style={styles.formContainer}>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Correo Electrónico"
                                placeholderTextColor={COLORS.grey}
                                value={formData.email}
                                onChangeText={(text) => handleInputChange('email', text)}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Contraseña"
                                placeholderTextColor={COLORS.grey}
                                value={formData.password}
                                onChangeText={(text) => handleInputChange('password', text)}
                                secureTextEntry
                            />
                        </View>

                        {/* Sign In Button */}
                        <TouchableOpacity
                            style={[styles.emailLoginButton, isEmailLoading && styles.disabledButton]}
                            onPress={handleEmailLogin}
                            disabled={isEmailLoading}
                            activeOpacity={0.8}
                        >
                            {isEmailLoading ? (
                                <ActivityIndicator size="small" color={COLORS.white} />
                            ) : (
                                <Text style={styles.emailLoginButtonText}>Iniciar Sesión</Text>
                            )}
                        </TouchableOpacity>

                        {/* Register Link */}
                        <View style={styles.registerLinkContainer}>
                            <Text style={styles.registerLinkTextWithBg}>¿No tienes una cuenta? </Text>
                            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                                <Text style={styles.registerLink}>Registrarse</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </SafeAreaView>
            </ImageBackground>
        );
    }

    return (
        <ImageBackground
            source={require('../assets/background-image.png')} // Replace with your image path
            style={styles.backgroundImage}
            resizeMode="cover"
        >
            <SafeAreaView style={styles.containerWithBg}>
                <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

                {/* Main content */}
                <View style={styles.backgroundContainer}>
                    <Image
                        source={require('../assets/bird-logo.png')}
                        style={styles.logo}
                        resizeMode="contain"
                    />

                    <Text style={styles.mainTextWithBg}>Con Sanad</Text>
                    <Text style={styles.subTextWithBg}>tu apoyo marca la diferencia</Text>
                </View>

                {/* Authentication Buttons */}
                <View style={styles.buttonContainer}>
                    {/* Email Sign In Button */}
                    <TouchableOpacity
                        style={styles.emailButton}
                        onPress={() => setShowEmailLogin(true)}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.emailButtonText}>Iniciar sesión con Correo</Text>
                    </TouchableOpacity>

                    {/* Register Link */}
                    <View style={styles.registerLinkContainer}>
                        <Text style={styles.registerLinkTextWithBg}>¿Nuevo en Sanad? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                            <Text style={styles.registerLink}>Crear Cuenta</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Footer */}
                <View style={styles.footer}>
                    <Text style={styles.footerTextWithBg}>© 2025 Sanad</Text>
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    // New styles for background image
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    containerWithBg: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.3)', // Optional: Add overlay for better text readability
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: SIZES.large,
        paddingTop: SIZES.large,
        paddingBottom: SIZES.medium,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.9)', // Semi-transparent for better visibility
        justifyContent: 'center',
        alignItems: 'center',
        ...SHADOWS.light,
    },
    backButtonText: {
        fontSize: 20,
        color: COLORS.black,
        fontFamily: FONTS.medium,
    },
    headerTitle: {
        flex: 1,
        textAlign: 'center',
        fontSize: SIZES.large,
        fontFamily: FONTS.semiBold,
        color: COLORS.white, // Changed to white for better visibility on background
        marginRight: 40,
    },
    backgroundContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    logoContainer: {
        alignItems: 'center',
        paddingVertical: SIZES.large,
    },
    logo: {
        width: 80,
        height: 80,
        marginBottom: SIZES.medium,
        tintColor: COLORS.white, // Changed for better visibility
    },
    mainText: {
        fontFamily: FONTS.semiBold,
        fontSize: SIZES.xxl,
        color: COLORS.black,
        marginBottom: SIZES.small,
        marginTop: SIZES.large,
    },
    // New styles for text with background
    mainTextWithBg: {
        fontFamily: FONTS.semiBold,
        fontSize: SIZES.xxl,
        color: COLORS.white,
        marginBottom: SIZES.small,
        marginTop: SIZES.large,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
    },
    subText: {
        fontFamily: FONTS.regular,
        fontSize: SIZES.large,
        color: COLORS.grey,
        textAlign: 'center',
        marginHorizontal: SIZES.large,
    },
    subTextWithBg: {
        fontFamily: FONTS.regular,
        fontSize: SIZES.large,
        color: COLORS.white,
        textAlign: 'center',
        marginHorizontal: SIZES.large,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
    },
    buttonContainer: {
        paddingHorizontal: SIZES.large * 2,
        paddingBottom: SIZES.large,
    },
    googleButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.white,
        borderRadius: 30,
        paddingVertical: SIZES.medium,
        paddingHorizontal: SIZES.large,
        marginBottom: SIZES.medium,
        ...SHADOWS.medium,
        borderWidth: 1,
        borderColor: COLORS.lightGrey,
    },
    emailButton: {
        backgroundColor: COLORS.primary,
        borderRadius: 30,
        paddingVertical: SIZES.medium,
        paddingHorizontal: SIZES.large,
        marginBottom: SIZES.large,
        ...SHADOWS.medium,
        alignItems: 'center',
        justifyContent: 'center',
    },
    disabledButton: {
        opacity: 0.7,
    },
    buttonText: {
        fontFamily: FONTS.medium,
        fontSize: SIZES.font,
        color: COLORS.black,
        marginLeft: SIZES.base,
    },
    emailButtonText: {
        fontFamily: FONTS.medium,
        fontSize: SIZES.font,
        color: COLORS.white,
    },
    formContainer: {
        flex: 1,
        paddingHorizontal: SIZES.large * 1.5,
        paddingTop: SIZES.large,
    },
    inputContainer: {
        marginBottom: SIZES.medium,
    },
    input: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)', // Semi-transparent for better visibility
        borderRadius: 12,
        paddingHorizontal: SIZES.medium,
        paddingVertical: SIZES.medium + 2,
        fontSize: SIZES.font,
        fontFamily: FONTS.regular,
        color: COLORS.black,
        borderWidth: 1,
        borderColor: COLORS.lightGrey,
        ...SHADOWS.light,
    },
    emailLoginButton: {
        backgroundColor: COLORS.primary,
        borderRadius: 12,
        paddingVertical: SIZES.medium + 4,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: SIZES.medium,
        ...SHADOWS.medium,
    },
    emailLoginButtonText: {
        color: COLORS.white,
        fontSize: SIZES.font + 2,
        fontFamily: FONTS.semiBold,
    },
    registerLinkContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: SIZES.large,
        paddingBottom: SIZES.large,
    },
    registerLinkText: {
        fontSize: SIZES.font,
        fontFamily: FONTS.regular,
        color: COLORS.grey,
    },
    registerLinkTextWithBg: {
        fontSize: SIZES.font,
        fontFamily: FONTS.regular,
        color: COLORS.white,
    },
    registerLink: {
        fontSize: SIZES.font,
        fontFamily: FONTS.semiBold,
        color: COLORS.primary,
    },
    footer: {
        paddingBottom: SIZES.large,
        alignItems: 'center',
    },
    footerText: {
        fontFamily: FONTS.regular,
        fontSize: SIZES.small,
        color: COLORS.grey,
    },
    footerTextWithBg: {
        fontFamily: FONTS.regular,
        fontSize: SIZES.small,
        color: COLORS.white,
    },
});

export default LoginScreen;