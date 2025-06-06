import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
    Image,
    ScrollView,
    Alert,
} from 'react-native';
import { COLORS, FONTS, SIZES, SHADOWS } from '../../utils/constants';
import { NavigationProps } from '../../types/navigation-types';
import { useAuth } from '../../context/AuthContext';

const AccountScreen = ({ navigation }: NavigationProps<'Account'>) => {
    const { logout, user } = useAuth(); // Get logout function and user data

    const handleSignOut = () => {
        Alert.alert(
            'Cerrar Sesión',
            '¿Estás seguro de que quieres cerrar sesión?',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Cerrar Sesión',
                    onPress: async () => {
                        try {
                            console.log('Signing out...');
                            await logout();
                            // Navigation will be handled automatically by your app's auth state management
                            // The user will be redirected to the auth screen when isAuthenticated becomes false
                        } catch (error) {
                            console.error('Logout error:', error);
                            Alert.alert(
                                'Error',
                                'Hubo un problema al cerrar sesión. Inténtalo de nuevo.'
                            );
                        }
                    },
                    style: 'destructive',
                },
            ],
        );
    };

    const AccountOption = ({ icon, title, subtitle, onPress, isDestructive = false }: {
        icon: any;
        title: string;
        subtitle?: string;
        onPress: () => void;
        isDestructive?: boolean;
    }) => (
        <TouchableOpacity
            style={[styles.optionContainer, isDestructive && styles.destructiveOption]}
            onPress={onPress}
        >
            <View style={styles.optionContent}>
                <View style={[styles.optionIconContainer, isDestructive && styles.destructiveIconContainer]}>
                    <Image
                        source={icon}
                        style={[
                            styles.optionIcon,
                            { tintColor: isDestructive ? COLORS.white : COLORS.primary }
                        ]}
                        resizeMode="contain"
                    />
                </View>
                <View style={styles.optionTextContainer}>
                    <Text style={[
                        styles.optionTitle,
                        isDestructive && { color: '#FF4444' }
                    ]}>
                        {title}
                    </Text>
                    {subtitle && (
                        <Text style={styles.optionSubtitle}>{subtitle}</Text>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.backButton}>←</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Mi Cuenta</Text>
                <View style={styles.headerPlaceholder} />
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {/* Profile Info */}
                <View style={styles.profileSection}>
                    <View style={styles.profileImageContainer}>
                        <Image
                            source={require('../../assets/bird-logo.png')}
                            style={styles.profileImage}
                            resizeMode="cover"
                        />
                    </View>
                    <Text style={styles.userName}>
                        {user?.name || 'Mohamed Amine'}
                    </Text>
                    <Text style={styles.userEmail}>
                        {user?.email || 'mohamed.amine@example.com'}
                    </Text>
                </View>

                {/* Account Options */}
                <View style={styles.optionsSection}>
                    <AccountOption
                        icon={require('../../assets/bird-logo.png')}
                        title="Cerrar Sesión"
                        subtitle="Salir de tu cuenta actual"
                        onPress={handleSignOut}
                        isDestructive={true}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        paddingTop: StatusBar.currentHeight || 0,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: SIZES.medium,
        paddingVertical: SIZES.small,
        backgroundColor: COLORS.white,
        ...SHADOWS.light,
    },
    backButton: {
        fontSize: 24,
        color: COLORS.primary,
        fontFamily: FONTS.medium,
    },
    headerTitle: {
        fontSize: SIZES.font + 2,
        fontFamily: FONTS.medium,
        color: COLORS.black,
    },
    headerPlaceholder: {
        width: 24,
    },
    content: {
        flex: 1,
        paddingHorizontal: SIZES.medium,
    },
    profileSection: {
        alignItems: 'center',
        paddingVertical: SIZES.extraLarge,
    },
    profileImageContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: SIZES.medium,
        ...SHADOWS.light,
    },
    profileImage: {
        width: 60,
        height: 60,
        tintColor: COLORS.white,
    },
    userName: {
        fontSize: SIZES.font + 4,
        fontFamily: FONTS.medium,
        color: COLORS.black,
        marginBottom: 4,
    },
    userEmail: {
        fontSize: SIZES.small,
        fontFamily: FONTS.regular,
        color: COLORS.grey,
    },
    optionsSection: {
        paddingBottom: SIZES.extraLarge,
    },
    optionContainer: {
        backgroundColor: COLORS.white,
        borderRadius: 16,
        marginBottom: SIZES.small,
        ...SHADOWS.light,
    },
    destructiveOption: {
        borderWidth: 1,
        borderColor: '#FFE6E6',
    },
    optionContent: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: SIZES.medium,
    },
    optionIconContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: COLORS.background,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: SIZES.medium,
    },
    destructiveIconContainer: {
        backgroundColor: '#FF4444',
    },
    optionIcon: {
        width: 24,
        height: 24,
    },
    optionTextContainer: {
        flex: 1,
    },
    optionTitle: {
        fontSize: SIZES.font,
        fontFamily: FONTS.medium,
        color: COLORS.black,
        marginBottom: 2,
    },
    optionSubtitle: {
        fontSize: SIZES.small,
        fontFamily: FONTS.regular,
        color: COLORS.grey,
    },
});

export default AccountScreen;