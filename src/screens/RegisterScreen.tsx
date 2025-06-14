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
} from 'react-native';
import { COLORS, FONTS, SIZES, SHADOWS } from '../utils/constants';
import { NavigationProps } from '../types/navigation-types';
import { useAuth } from '../context/AuthContext';

const RegisterScreen = ({ navigation }: NavigationProps<'Register'>) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [isLoading, setIsLoading] = useState(false);

    const { register } = useAuth();

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const validateForm = () => {
        if (!formData.name.trim()) {
            Alert.alert('Error', 'Por favor ingresa tu nombre');
            return false;
        }
        if (!formData.email.trim()) {
            Alert.alert('Error', 'Por favor ingresa tu correo electrónico');
            return false;
        }
        if (!formData.email.includes('@')) {
            Alert.alert('Error', 'Por favor ingresa un correo válido');
            return false;
        }
        if (formData.password.length < 6) {
            Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres');
            return false;
        }
        if (formData.password !== formData.confirmPassword) {
            Alert.alert('Error', 'Las contraseñas no coinciden');
            return false;
        }
        return true;
    };

    const handleRegister = async () => {
        if (!validateForm()) return;

        try {
            setIsLoading(true);
            await register({
                name: formData.name.trim(),
                email: formData.email.trim().toLowerCase(),
                password: formData.password,
            });
        } catch (error: any) {
            Alert.alert('Registro Fallido', error.message || 'Por favor intenta de nuevo');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.backButtonText}>←</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Crear Cuenta</Text>
            </View>

            {/* Logo */}
            <View style={styles.logoContainer}>
                <Image
                    source={require('../assets/bird-logo.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
                <Text style={styles.mainText}>Únete a Sanad</Text>
                <Text style={styles.subText}>Comienza a hacer la diferencia hoy</Text>
            </View>

            {/* Form */}
            <View style={styles.formContainer}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Nombre Completo"
                        placeholderTextColor={COLORS.grey}
                        value={formData.name}
                        onChangeText={(text) => handleInputChange('name', text)}
                        autoCapitalize="words"
                    />
                </View>

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

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Confirmar Contraseña"
                        placeholderTextColor={COLORS.grey}
                        value={formData.confirmPassword}
                        onChangeText={(text) => handleInputChange('confirmPassword', text)}
                        secureTextEntry
                    />
                </View>

                {/* Register Button */}
                <TouchableOpacity
                    style={[styles.registerButton, isLoading && styles.disabledButton]}
                    onPress={handleRegister}
                    disabled={isLoading}
                    activeOpacity={0.8}
                >
                    {isLoading ? (
                        <ActivityIndicator size="small" color={COLORS.white} />
                    ) : (
                        <Text style={styles.registerButtonText}>Crear Cuenta</Text>
                    )}
                </TouchableOpacity>

                {/* Login Link */}
                <View style={styles.loginLinkContainer}>
                    <Text style={styles.loginLinkText}>¿Ya tienes una cuenta? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.loginLink}>Iniciar Sesión</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
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
        backgroundColor: COLORS.white,
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
        color: COLORS.black,
        marginRight: 40,
    },
    logoContainer: {
        alignItems: 'center',
        paddingVertical: SIZES.large,
    },
    logo: {
        width: 60,
        height: 60,
        tintColor: COLORS.primary,
        marginBottom: SIZES.medium,
    },
    mainText: {
        fontFamily: FONTS.semiBold,
        fontSize: SIZES.xl,
        color: COLORS.black,
        marginBottom: SIZES.small,
    },
    subText: {
        fontFamily: FONTS.regular,
        fontSize: SIZES.font,
        color: COLORS.grey,
        textAlign: 'center',
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
        backgroundColor: COLORS.white,
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
    registerButton: {
        backgroundColor: COLORS.primary,
        borderRadius: 12,
        paddingVertical: SIZES.medium + 4,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: SIZES.medium,
        ...SHADOWS.medium,
    },
    disabledButton: {
        opacity: 0.7,
    },
    registerButtonText: {
        color: COLORS.white,
        fontSize: SIZES.font + 2,
        fontFamily: FONTS.semiBold,
    },
    loginLinkContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: SIZES.large,
        paddingBottom: SIZES.large,
    },
    loginLinkText: {
        fontSize: SIZES.font,
        fontFamily: FONTS.regular,
        color: COLORS.grey,
    },
    loginLink: {
        fontSize: SIZES.font,
        fontFamily: FONTS.semiBold,
        color: COLORS.primary,
    },
});

export default RegisterScreen;