import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
    Image,
    ScrollView,
    TextInput,
    Alert,
    Share,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { COLORS, FONTS, SIZES, SHADOWS } from '../../utils/constants';
import { NavigationProps } from '../../types/navigation-types';

const InviteFriendsScreen = ({ navigation }: NavigationProps<'InviteFriends'>) => {
    const [email, setEmail] = useState('');
    const [emailList, setEmailList] = useState<string[]>([]);

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleAddEmail = () => {
        if (!email.trim()) {
            Alert.alert('Error', 'Por favor, ingresa un email');
            return;
        }

        if (!validateEmail(email)) {
            Alert.alert('Error', 'Por favor, ingresa un email válido');
            return;
        }

        if (emailList.includes(email)) {
            Alert.alert('Error', 'Este email ya está en la lista');
            return;
        }

        setEmailList([...emailList, email]);
        setEmail('');
    };

    const handleRemoveEmail = (emailToRemove: string) => {
        setEmailList(emailList.filter(e => e !== emailToRemove));
    };

    const handleSendInvitations = () => {
        if (emailList.length === 0) {
            Alert.alert('Error', 'No hay emails en la lista para enviar');
            return;
        }

        Alert.alert(
            'Invitaciones Enviadas',
            `Se han enviado ${emailList.length} invitación(es) exitosamente.`,
            [
                {
                    text: 'OK',
                    onPress: () => {
                        setEmailList([]);
                    },
                },
            ]
        );
    };

    const handleShareApp = async () => {
        try {
            const shareOptions = {
                message: 'SanadApp - ¡Únete a mí en esta increíble plataforma de donaciones! 🤝\n\nDescubre causas significativas y haz la diferencia con solo unos clics. Juntos podemos crear un impacto positivo en el mundo.\n\nDescarga SanadApp ahora: https://sanadapp.com/download',
                title: 'Únete a SanadApp'
            };

            await Share.share(shareOptions);
        } catch (error) {
            Alert.alert('Error', 'No se pudo compartir la aplicación');
        }
    };

    const ShareOption = ({
                             icon,
                             title,
                             subtitle,
                             onPress,
                             backgroundColor = COLORS.primary
                         }: {
        icon: any;
        title: string;
        subtitle: string;
        onPress: () => void;
        backgroundColor?: string;
    }) => (
        <TouchableOpacity style={styles.shareOption} onPress={onPress}>
            <View style={[styles.shareIconContainer, { backgroundColor }]}>
                <Image
                    source={icon}
                    style={styles.shareIcon}
                    resizeMode="contain"
                />
            </View>
            <View style={styles.shareTextContainer}>
                <Text style={styles.shareTitle}>{title}</Text>
                <Text style={styles.shareSubtitle}>{subtitle}</Text>
            </View>
            <View style={styles.shareArrow}>
                <Text style={styles.arrowText}>→</Text>
            </View>
        </TouchableOpacity>
    );

    const EmailChip = ({ email, onRemove }: { email: string; onRemove: () => void }) => (
        <View style={styles.emailChip}>
            <Text style={styles.emailChipText}>{email}</Text>
            <TouchableOpacity onPress={onRemove} style={styles.removeButton}>
                <Text style={styles.removeButtonText}>×</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.backButton}>←</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Invita Amigos</Text>
                <View style={styles.headerPlaceholder} />
            </View>

            <KeyboardAvoidingView
                style={styles.keyboardContainer}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                    {/* Welcome Section */}
                    <View style={styles.welcomeSection}>
                        <View style={styles.welcomeIconContainer}>
                            <Image
                                source={require('../../assets/invite-icon.png')}
                                style={styles.welcomeIcon}
                                resizeMode="contain"
                            />
                        </View>
                        <Text style={styles.welcomeTitle}>Comparte SanadApp</Text>
                        <Text style={styles.welcomeSubtitle}>
                            Invita a tus amigos a unirse a la comunidad de donaciones más grande y haz la diferencia juntos.
                        </Text>
                    </View>

                    {/* Share Options */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Compartir Aplicación</Text>

                        <ShareOption
                            icon={require('../../assets/invite-icon.png')}
                            title="Compartir Link"
                            subtitle="Comparte SanadApp con tus contactos"
                            onPress={handleShareApp}
                            backgroundColor="#25D366"
                        />
                    </View>

                    {/* Email Invitation Section */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Invitar por Email</Text>

                        <View style={styles.emailInputContainer}>
                            <TextInput
                                style={styles.emailInput}
                                placeholder="Ingresa el email de tu amigo"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                autoCorrect={false}
                            />
                            <TouchableOpacity
                                style={styles.addButton}
                                onPress={handleAddEmail}
                            >
                                <Text style={styles.addButtonText}>+</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Email List */}
                        {emailList.length > 0 && (
                            <View style={styles.emailListContainer}>
                                <Text style={styles.emailListTitle}>
                                    Emails agregados ({emailList.length})
                                </Text>
                                <View style={styles.emailChipsContainer}>
                                    {emailList.map((email, index) => (
                                        <EmailChip
                                            key={index}
                                            email={email}
                                            onRemove={() => handleRemoveEmail(email)}
                                        />
                                    ))}
                                </View>

                                <TouchableOpacity
                                    style={styles.sendButton}
                                    onPress={handleSendInvitations}
                                >
                                    <Text style={styles.sendButtonText}>
                                        Enviar Invitaciones
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>

                    {/* Benefits Section */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>¿Por qué invitar amigos?</Text>

                        <View style={styles.benefitItem}>
                            <View style={styles.benefitIcon}>
                                <Text style={styles.benefitEmoji}>💝</Text>
                            </View>
                            <View style={styles.benefitTextContainer}>
                                <Text style={styles.benefitTitle}>Multiplica el Impacto</Text>
                                <Text style={styles.benefitDescription}>
                                    Juntos pueden apoyar más causas y crear un mayor impacto positivo.
                                </Text>
                            </View>
                        </View>

                        <View style={styles.benefitItem}>
                            <View style={styles.benefitIcon}>
                                <Text style={styles.benefitEmoji}>🤝</Text>
                            </View>
                            <View style={styles.benefitTextContainer}>
                                <Text style={styles.benefitTitle}>Construye Comunidad</Text>
                                <Text style={styles.benefitDescription}>
                                    Conecta con amigos que comparten tus valores de solidaridad.
                                </Text>
                            </View>
                        </View>

                        <View style={styles.benefitItem}>
                            <View style={styles.benefitIcon}>
                                <Text style={styles.benefitEmoji}>🌟</Text>
                            </View>
                            <View style={styles.benefitTextContainer}>
                                <Text style={styles.benefitTitle}>Inspira a Otros</Text>
                                <Text style={styles.benefitDescription}>
                                    Tu ejemplo puede motivar a otros a comenzar su viaje de donación.
                                </Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
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
    keyboardContainer: {
        flex: 1,
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
    shareOption: {
        backgroundColor: COLORS.white,
        borderRadius: 16,
        padding: SIZES.medium,
        flexDirection: 'row',
        alignItems: 'center',
        ...SHADOWS.light,
    },
    shareIconContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: SIZES.medium,
    },
    shareIcon: {
        width: 24,
        height: 24,
        tintColor: COLORS.white,
    },
    shareTextContainer: {
        flex: 1,
    },
    shareTitle: {
        fontSize: SIZES.font,
        fontFamily: FONTS.medium,
        color: COLORS.black,
        marginBottom: 2,
    },
    shareSubtitle: {
        fontSize: SIZES.small,
        fontFamily: FONTS.regular,
        color: COLORS.grey,
    },
    shareArrow: {
        marginLeft: SIZES.small,
    },
    arrowText: {
        fontSize: 18,
        color: COLORS.grey,
    },
    emailInputContainer: {
        flexDirection: 'row',
        backgroundColor: COLORS.white,
        borderRadius: 12,
        padding: 4,
        ...SHADOWS.light,
    },
    emailInput: {
        flex: 1,
        paddingHorizontal: SIZES.medium,
        paddingVertical: SIZES.small,
        fontSize: SIZES.font,
        fontFamily: FONTS.regular,
        color: COLORS.black,
    },
    addButton: {
        backgroundColor: COLORS.primary,
        borderRadius: 8,
        width: 44,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addButtonText: {
        fontSize: 24,
        color: COLORS.white,
        fontFamily: FONTS.medium,
    },
    emailListContainer: {
        marginTop: SIZES.medium,
        backgroundColor: COLORS.white,
        borderRadius: 12,
        padding: SIZES.medium,
        ...SHADOWS.light,
    },
    emailListTitle: {
        fontSize: SIZES.font,
        fontFamily: FONTS.medium,
        color: COLORS.black,
        marginBottom: SIZES.small,
    },
    emailChipsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: SIZES.medium,
    },
    emailChip: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.background,
        borderRadius: 20,
        paddingLeft: SIZES.small,
        paddingRight: 4,
        paddingVertical: 6,
        margin: 2,
    },
    emailChipText: {
        fontSize: SIZES.small,
        fontFamily: FONTS.regular,
        color: COLORS.black,
        marginRight: 4,
    },
    removeButton: {
        backgroundColor: COLORS.primary,
        borderRadius: 10,
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    removeButtonText: {
        fontSize: 14,
        color: COLORS.white,
        fontFamily: FONTS.medium,
    },
    sendButton: {
        backgroundColor: COLORS.primary,
        borderRadius: 12,
        paddingVertical: SIZES.small + 2,
        alignItems: 'center',
    },
    sendButtonText: {
        fontSize: SIZES.font,
        fontFamily: FONTS.medium,
        color: COLORS.white,
    },
    benefitItem: {
        flexDirection: 'row',
        backgroundColor: COLORS.white,
        borderRadius: 12,
        padding: SIZES.medium,
        marginBottom: SIZES.small,
        ...SHADOWS.light,
    },
    benefitIcon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: COLORS.background,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: SIZES.medium,
    },
    benefitEmoji: {
        fontSize: 24,
    },
    benefitTextContainer: {
        flex: 1,
    },
    benefitTitle: {
        fontSize: SIZES.font,
        fontFamily: FONTS.medium,
        color: COLORS.black,
        marginBottom: 4,
    },
    benefitDescription: {
        fontSize: SIZES.small + 1,
        fontFamily: FONTS.regular,
        color: COLORS.grey,
        lineHeight: 18,
    },
});

export default InviteFriendsScreen;