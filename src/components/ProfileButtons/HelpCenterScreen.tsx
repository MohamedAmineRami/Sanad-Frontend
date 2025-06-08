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
    Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SIZES, SHADOWS } from '../../utils/constants';
import { NavigationProps } from '../../types/navigation-types';

const HelpCenterScreen = ({ navigation }: NavigationProps<'HelpCenter'>) => {
    const handleCall = (phoneNumber: string) => {
        const url = `tel:${phoneNumber}`;
        Linking.canOpenURL(url)
            .then((supported) => {
                if (supported) {
                    Linking.openURL(url);
                } else {
                    Alert.alert('Error', 'No se puede realizar la llamada');
                }
            })
            .catch(() => {
                Alert.alert('Error', 'No se puede realizar la llamada');
            });
    };

    const handleEmail = (email: string) => {
        const url = `mailto:${email}?subject=Consulta sobre SanadApp`;
        Linking.canOpenURL(url)
            .then((supported) => {
                if (supported) {
                    Linking.openURL(url);
                } else {
                    Alert.alert('Error', 'No se puede abrir el cliente de correo');
                }
            })
            .catch(() => {
                Alert.alert('Error', 'No se puede abrir el cliente de correo');
            });
    };

    const ContactCard = ({
                             iconName,
                             iconType = 'ionicon',
                             title,
                             subtitle,
                             contact,
                             onPress,
                             type = 'phone'
                         }: {
        iconName: string;
        iconType?: 'ionicon' | 'image';
        title: string;
        subtitle: string;
        contact: string;
        onPress: () => void;
        type?: 'phone' | 'email';
    }) => (
        <TouchableOpacity style={styles.contactCard} onPress={onPress}>
            <View style={styles.contactIconContainer}>
                {iconType === 'ionicon' ? (
                    <Ionicons
                        name={iconName as any}
                        size={24}
                        color={COLORS.primary}
                    />
                ) : (
                    <Image
                        source={{ uri: iconName }}
                        style={styles.contactIcon}
                        resizeMode="contain"
                    />
                )}
            </View>
            <View style={styles.contactInfo}>
                <Text style={styles.contactTitle}>{title}</Text>
                <Text style={styles.contactSubtitle}>{subtitle}</Text>
                <Text style={[
                    styles.contactValue,
                    { color: type === 'email' ? COLORS.primary : '#2E8B57' }
                ]}>
                    {contact}
                </Text>
            </View>
            <View style={styles.contactArrow}>
                <Ionicons name="chevron-forward" size={18} color={COLORS.grey} />
            </View>
        </TouchableOpacity>
    );

    const FAQItem = ({ question, answer }: { question: string; answer: string }) => (
        <View style={styles.faqItem}>
            <Text style={styles.faqQuestion}>{question}</Text>
            <Text style={styles.faqAnswer}>{answer}</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back" size={24} color={COLORS.primary} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Centro de Ayuda</Text>
                <View style={styles.headerPlaceholder} />
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {/* Welcome Section */}
                <View style={styles.welcomeSection}>
                    <View style={styles.welcomeIconContainer}>
                        <Ionicons
                            name="help-circle"
                            size={40}
                            color={COLORS.white}
                        />
                    </View>
                    <Text style={styles.welcomeTitle}>¿Necesitas Ayuda?</Text>
                    <Text style={styles.welcomeSubtitle}>
                        Estamos aquí para ayudarte. Contacta con nuestro equipo de soporte.
                    </Text>
                </View>

                {/* Contact Information */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Información de Contacto</Text>

                    <ContactCard
                        iconName="headset"
                        title="Soporte General"
                        subtitle="Lunes a Viernes, 9:00 AM - 6:00 PM"
                        contact="+970 555 123 456"
                        onPress={() => handleCall('+213555123456')}
                        type="phone"
                    />

                    <ContactCard
                        iconName="build"
                        title="Soporte Técnico"
                        subtitle="Disponible 24/7"
                        contact="+970 555 789 012"
                        onPress={() => handleCall('+213555789012')}
                        type="phone"
                    />

                    <ContactCard
                        iconName="mail"
                        title="Consultas por Email"
                        subtitle="Respuesta en 24 horas"
                        contact="soporte@sanadapp.com"
                        onPress={() => handleEmail('soporte@sanadapp.com')}
                        type="email"
                    />

                    <ContactCard
                        iconName="people"
                        title="Colaboraciones"
                        subtitle="Para organizaciones benéficas"
                        contact="colaboraciones@sanadapp.com"
                        onPress={() => handleEmail('colaboraciones@sanadapp.com')}
                        type="email"
                    />
                </View>

                {/* FAQ Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Preguntas Frecuentes</Text>

                    <FAQItem
                        question="¿Cómo puedo hacer una donación?"
                        answer="Puedes hacer donaciones directamente desde la app seleccionando una campaña y siguiendo los pasos de pago seguro."
                    />

                    <FAQItem
                        question="¿Son seguras mis donaciones?"
                        answer="Sí, todas las transacciones están protegidas con encriptación de última generación y procesadas por proveedores de pago certificados."
                    />

                    <FAQItem
                        question="¿Puedo ver el impacto de mis donaciones?"
                        answer="Absolutamente. Puedes ver el progreso de las campañas que has apoyado y recibir actualizaciones sobre su impacto."
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
    welcomeSection: {
        alignItems: 'center',
        paddingVertical: SIZES.extraLarge,
    },
    welcomeIconContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: SIZES.medium,
        ...SHADOWS.light,
    },
    welcomeIcon: {
        width: 40,
        height: 40,
        tintColor: COLORS.white,
    },
    welcomeTitle: {
        fontSize: SIZES.font + 4,
        fontFamily: FONTS.medium,
        color: COLORS.black,
        marginBottom: SIZES.small,
    },
    welcomeSubtitle: {
        fontSize: SIZES.font,
        fontFamily: FONTS.regular,
        color: COLORS.grey,
        textAlign: 'center',
        lineHeight: 24,
    },
    section: {
        marginBottom: SIZES.extraLarge,
    },
    sectionTitle: {
        fontSize: SIZES.font + 2,
        fontFamily: FONTS.medium,
        color: COLORS.black,
        marginBottom: SIZES.medium,
    },
    contactCard: {
        backgroundColor: COLORS.white,
        borderRadius: 16,
        padding: SIZES.medium,
        marginBottom: SIZES.small,
        flexDirection: 'row',
        alignItems: 'center',
        ...SHADOWS.light,
    },
    contactIconContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: COLORS.background,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: SIZES.medium,
    },
    contactIcon: {
        width: 24,
        height: 24,
        tintColor: COLORS.primary,
    },
    contactInfo: {
        flex: 1,
    },
    contactTitle: {
        fontSize: SIZES.font,
        fontFamily: FONTS.medium,
        color: COLORS.black,
        marginBottom: 2,
    },
    contactSubtitle: {
        fontSize: SIZES.small,
        fontFamily: FONTS.regular,
        color: COLORS.grey,
        marginBottom: 4,
    },
    contactValue: {
        fontSize: SIZES.font,
        fontFamily: FONTS.medium,
    },
    contactArrow: {
        marginLeft: SIZES.small,
    },
    arrowText: {
        fontSize: 18,
        color: COLORS.grey,
    },
    faqItem: {
        backgroundColor: COLORS.white,
        borderRadius: 12,
        padding: SIZES.medium,
        marginBottom: SIZES.small,
        ...SHADOWS.light,
    },
    faqQuestion: {
        fontSize: SIZES.font,
        fontFamily: FONTS.medium,
        color: COLORS.black,
        marginBottom: SIZES.small,
    },
    faqAnswer: {
        fontSize: SIZES.small + 1,
        fontFamily: FONTS.regular,
        color: COLORS.grey,
        lineHeight: 20,
    },
});

export default HelpCenterScreen;