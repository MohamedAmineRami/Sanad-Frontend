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
    Linking,
} from 'react-native';
import { COLORS, FONTS, SIZES, SHADOWS } from '../../utils/constants';
import { NavigationProps } from '../../types/navigation-types';

const AboutSanadScreen = ({ navigation }: NavigationProps<'AboutSanad'>) => {
    const handleWebsitePress = () => {
        Linking.openURL('https://sanadapp.com');
    };

    const handleSocialPress = (platform: string) => {
        const urls = {
            facebook: 'https://facebook.com/sanadapp',
            twitter: 'https://twitter.com/sanadapp',
            instagram: 'https://instagram.com/sanadapp',
        };
        Linking.openURL(urls[platform as keyof typeof urls]);
    };

    const FeatureCard = ({
                             icon,
                             title,
                             description,
                             backgroundColor = COLORS.primary
                         }: {
        icon: any;
        title: string;
        description: string;
        backgroundColor?: string;
    }) => (
        <View style={styles.featureCard}>
            <View style={[styles.featureIconContainer, { backgroundColor }]}>
                <Image
                    source={icon}
                    style={styles.featureIcon}
                    resizeMode="contain"
                />
            </View>
            <View style={styles.featureTextContainer}>
                <Text style={styles.featureTitle}>{title}</Text>
                <Text style={styles.featureDescription}>{description}</Text>
            </View>
        </View>
    );

    const StatCard = ({ number, label }: { number: string; label: string }) => (
        <View style={styles.statCard}>
            <Text style={styles.statNumber}>{number}</Text>
            <Text style={styles.statLabel}>{label}</Text>
        </View>
    );

    const SocialButton = ({
                              icon,
                              platform,
                              color
                          }: {
        icon: any;
        platform: string;
        color: string;
    }) => (
        <TouchableOpacity
            style={[styles.socialButton, { backgroundColor: color }]}
            onPress={() => handleSocialPress(platform)}
        >
            <Image
                source={icon}
                style={styles.socialIcon}
                resizeMode="contain"
            />
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
                <Text style={styles.headerTitle}>Sobre Sanad</Text>
                <View style={styles.headerPlaceholder} />
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {/* Logo and Main Description */}
                <View style={styles.heroSection}>
                    <View style={styles.logoContainer}>
                        <Image
                            source={require('../../assets/bird-logo.png')}
                            style={styles.logo}
                            resizeMode="contain"
                        />
                    </View>
                    <Text style={styles.appName}>SanadApp</Text>
                    <Text style={styles.tagline}>Conectando corazones, transformando vidas</Text>

                    <View style={styles.descriptionContainer}>
                        <Text style={styles.description}>
                            Sanad es una plataforma de donaciones moderna diseñada para simplificar la donación caritativa y conectar a los usuarios con causas significativas. Ofrece herramientas fáciles de usar para descubrir campañas, realizar un seguimiento de las donaciones y apoyar una variedad de iniciativas.
                        </Text>
                    </View>
                </View>

                {/* Features Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>¿Qué nos hace únicos?</Text>

                    <FeatureCard
                        icon={require('../../assets/user-icon.png')}
                        title="Transparencia Total"
                        description="Seguimiento en tiempo real de cómo se utilizan tus donaciones con actualizaciones regulares."
                        backgroundColor="#4CAF50"
                    />

                    <FeatureCard
                        icon={require('../../assets/help-icon.png')}
                        title="Seguridad Garantizada"
                        description="Transacciones protegidas con la más alta tecnología de encriptación y verificación."
                        backgroundColor="#2196F3"
                    />

                    <FeatureCard
                        icon={require('../../assets/invite-icon.png')}
                        title="Comunidad Unida"
                        description="Conecta con otros donantes y organizaciones para maximizar el impacto social."
                        backgroundColor="#FF9800"
                    />

                    <FeatureCard
                        icon={require('../../assets/bird-logo.png')}
                        title="Facilidad de Uso"
                        description="Interfaz intuitiva que hace que donar sea muy simple en unos sencillos pasos."
                        backgroundColor="#9C27B0"
                    />
                </View>

                {/* Mission Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Nuestra Misión</Text>
                    <View style={styles.missionContainer}>
                        <Text style={styles.missionText}>
                            En SanadApp, creemos que cada persona tiene el poder de hacer una diferencia. Nuestra misión es democratizar la filantropía, haciendo que las donaciones sean accesibles, transparentes y significativas para todos.
                        </Text>
                        <Text style={styles.missionText}>
                            Trabajamos incansablemente para crear un mundo donde la generosidad fluya sin barreras, conectando a quienes quieren ayudar con quienes más lo necesitan.
                        </Text>
                    </View>
                </View>

                {/* Contact and Social */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Conéctate con Nosotros</Text>

                    <TouchableOpacity style={styles.websiteButton} onPress={handleWebsitePress}>
                        <View style={styles.websiteIconContainer}>
                            <Image
                                source={require('../../assets/bird-logo.png')}
                                style={styles.websiteIcon}
                                resizeMode="contain"
                            />
                        </View>
                        <View style={styles.websiteTextContainer}>
                            <Text style={styles.websiteTitle}>Visita nuestro sitio web</Text>
                            <Text style={styles.websiteUrl}>www.sanadapp.com</Text>
                        </View>
                        <View style={styles.websiteArrow}>
                            <Text style={styles.arrowText}>→</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                {/* Version Info */}
                <View style={styles.versionSection}>
                    <Text style={styles.versionText}>Versión 1.0.0</Text>
                    <Text style={styles.copyrightText}>© 2024 SanadApp. Todos los derechos reservados.</Text>
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
    heroSection: {
        alignItems: 'center',
        paddingVertical: SIZES.extraLarge,
    },
    logoContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: SIZES.medium,
        ...SHADOWS.light,
    },
    logo: {
        width: 60,
        height: 60,
        tintColor: COLORS.white,
    },
    appName: {
        fontSize: SIZES.font + 8,
        fontFamily: FONTS.medium,
        color: COLORS.black,
        marginBottom: SIZES.small,
    },
    tagline: {
        fontSize: SIZES.font + 1,
        fontFamily: FONTS.regular,
        color: COLORS.primary,
        marginBottom: SIZES.large,
        fontStyle: 'italic',
    },
    descriptionContainer: {
        backgroundColor: COLORS.white,
        borderRadius: 16,
        padding: SIZES.large,
        ...SHADOWS.light,
    },
    description: {
        fontSize: SIZES.font + 1,
        fontFamily: FONTS.regular,
        color: COLORS.black,
        lineHeight: 26,
        textAlign: 'center',
    },
    statsSection: {
        marginBottom: SIZES.extraLarge,
    },
    sectionTitle: {
        fontSize: SIZES.font + 4,
        fontFamily: FONTS.medium,
        color: COLORS.black,
        marginBottom: SIZES.medium,
        textAlign: 'center',
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    statCard: {
        flex: 1,
        backgroundColor: COLORS.white,
        borderRadius: 16,
        padding: SIZES.medium,
        alignItems: 'center',
        marginHorizontal: 4,
        ...SHADOWS.light,
    },
    statNumber: {
        fontSize: SIZES.font + 6,
        fontFamily: FONTS.medium,
        color: COLORS.primary,
        marginBottom: 4,
    },
    statLabel: {
        fontSize: SIZES.small,
        fontFamily: FONTS.regular,
        color: COLORS.grey,
        textAlign: 'center',
    },
    section: {
        marginBottom: SIZES.extraLarge,
    },
    featureCard: {
        backgroundColor: COLORS.white,
        borderRadius: 16,
        padding: SIZES.medium,
        marginBottom: SIZES.small,
        flexDirection: 'row',
        alignItems: 'center',
        ...SHADOWS.light,
    },
    featureIconContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: SIZES.medium,
    },
    featureIcon: {
        width: 30,
        height: 30,
        tintColor: COLORS.white,
    },
    featureTextContainer: {
        flex: 1,
    },
    featureTitle: {
        fontSize: SIZES.font + 1,
        fontFamily: FONTS.medium,
        color: COLORS.black,
        marginBottom: 4,
    },
    featureDescription: {
        fontSize: SIZES.small + 1,
        fontFamily: FONTS.regular,
        color: COLORS.grey,
        lineHeight: 20,
    },
    missionContainer: {
        backgroundColor: COLORS.white,
        borderRadius: 16,
        padding: SIZES.large,
        ...SHADOWS.light,
    },
    missionText: {
        fontSize: SIZES.font + 1,
        fontFamily: FONTS.regular,
        color: COLORS.black,
        lineHeight: 26,
        marginBottom: SIZES.medium,
        textAlign: 'justify',
    },
    websiteButton: {
        backgroundColor: COLORS.white,
        borderRadius: 16,
        padding: SIZES.medium,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SIZES.medium,
        ...SHADOWS.light,
    },
    websiteIconContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: SIZES.medium,
    },
    websiteIcon: {
        width: 24,
        height: 24,
        tintColor: COLORS.white,
    },
    websiteTextContainer: {
        flex: 1,
    },
    websiteTitle: {
        fontSize: SIZES.font,
        fontFamily: FONTS.medium,
        color: COLORS.black,
        marginBottom: 2,
    },
    websiteUrl: {
        fontSize: SIZES.small + 1,
        fontFamily: FONTS.regular,
        color: COLORS.primary,
    },
    websiteArrow: {
        marginLeft: SIZES.small,
    },
    arrowText: {
        fontSize: 18,
        color: COLORS.grey,
    },
    socialSection: {
        alignItems: 'center',
    },
    socialTitle: {
        fontSize: SIZES.font + 1,
        fontFamily: FONTS.medium,
        color: COLORS.black,
        marginBottom: SIZES.medium,
    },
    socialButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    socialButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: SIZES.small,
        ...SHADOWS.light,
    },
    socialIcon: {
        width: 24,
        height: 24,
        tintColor: COLORS.white,
    },
    versionSection: {
        alignItems: 'center',
        paddingVertical: SIZES.large,
        borderTopWidth: 1,
        borderTopColor: '#E5E5E5',
        marginTop: SIZES.medium,
    },
    versionText: {
        fontSize: SIZES.small + 1,
        fontFamily: FONTS.medium,
        color: COLORS.grey,
        marginBottom: 4,
    },
    copyrightText: {
        fontSize: SIZES.small,
        fontFamily: FONTS.regular,
        color: COLORS.grey,
    },
});

export default AboutSanadScreen;