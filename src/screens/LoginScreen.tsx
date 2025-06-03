import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    SafeAreaView,
    Image
} from 'react-native';
import { COLORS, FONTS, SIZES, SHADOWS } from '../utils/constants';
import GoogleIcon from '../components/login/GoogleIcon';
import { NavigationProps } from '../types/navigation-types';

const LoginScreen = ({ navigation }: NavigationProps<'Login'>) => {
    // We'll implement the actual Google authentication later
    const handleGoogleSignIn = () => {
        // Navigate to MainTabs instead of Home
        navigation.navigate('MainTabs');
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

            {/* Main content */}
            <View style={styles.backgroundContainer}>
                <Image
                    source={require('../assets/bird-logo.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />

                <Text style={styles.mainText}>Con Sanad</Text>
                <Text style={styles.subText}>tu apoyo marca la diferencia</Text>
            </View>

            {/* Google Sign In Button */}
            <TouchableOpacity
                style={styles.googleButton}
                onPress={handleGoogleSignIn}
                activeOpacity={0.8}
            >
                <GoogleIcon width={24} height={24} />
                <Text style={styles.buttonText}>Continue with Google</Text>
            </TouchableOpacity>

            {/* Footer */}
            <View style={styles.footer}>
                <Text style={styles.footerText}>© 2025 Sanad</Text>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    backgroundContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    logo: {
        width: 80,
        height: 80,
        marginBottom: SIZES.medium,
        tintColor: COLORS.primary,
    },
    mainText: {
        fontFamily: FONTS.semiBold,
        fontSize: SIZES.xxl,
        color: COLORS.black,
        marginBottom: SIZES.small,
        marginTop: SIZES.large,
    },
    subText: {
        fontFamily: FONTS.regular,
        fontSize: SIZES.large,
        color: COLORS.grey,
        textAlign: 'center',
        marginHorizontal: SIZES.large,
    },
    googleButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.white,
        borderRadius: 30,
        paddingVertical: SIZES.medium,
        paddingHorizontal: SIZES.large,
        marginHorizontal: SIZES.large * 2,
        marginBottom: SIZES.extraLarge * 2,
        ...SHADOWS.medium,
        borderWidth: 1,
        borderColor: COLORS.lightGrey,
    },
    buttonText: {
        fontFamily: FONTS.medium,
        fontSize: SIZES.font,
        color: COLORS.black,
        marginLeft: SIZES.base,
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
});

export default LoginScreen;