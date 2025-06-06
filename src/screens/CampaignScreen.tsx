import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    ScrollView,
    Image,
    TouchableOpacity,
    Dimensions,
    ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SIZES, SHADOWS } from '../utils/constants';
import { NavigationProps } from '../types/navigation-types';
import { Campaign, BackendCampaign, transformCampaign } from '../types/campaign';
import ApiService from '../services/api';

const { width } = Dimensions.get('window');

interface CampaignScreenProps extends NavigationProps<'CampaignDetails'> {}

const CampaignScreen = ({ navigation, route }: CampaignScreenProps) => {
    const { id } = route.params;
    const [campaign, setCampaign] = useState<Campaign | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchCampaignData();
    }, [id]);

    const fetchCampaignData = async () => {
        try {
            setLoading(true);
            setError(null);

            // Convert string id to number for API call
            const numericId = parseInt(id.toString(), 10);
            const backendCampaign: BackendCampaign = await ApiService.getCampaignById(numericId);
            const transformedCampaign = transformCampaign(backendCampaign);

            setCampaign(transformedCampaign);
        } catch (err) {
            console.error('Error fetching campaign:', err);
            setError('Failed to load campaign details');
        } finally {
            setLoading(false);
        }
    };

    // Get progress bar color based on campaign category
    const getProgressColor = (category: string) => {
        switch (category) {
            case 'food':
                return '#8C6E63'; // Brown for food
            case 'water':
                return '#3498DB'; // Blue for water
            case 'education':
                return '#F39C12'; // Orange for education
            case 'other':
            default:
                return COLORS.primary; // Default primary color
        }
    };

    const handleBackPress = () => {
        navigation.goBack();
    };

    const handleDonate = () => {
        if (campaign) {
            navigation.navigate('Donation', { campaignId: campaign.id });
        }
    };

    if (loading) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={COLORS.primary} />
                    <Text style={styles.loadingText}>Loading campaign...</Text>
                </View>
            </SafeAreaView>
        );
    }

    if (error || !campaign) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.errorContainer}>
                    <Ionicons name="alert-circle-outline" size={50} color={COLORS.grey} />
                    <Text style={styles.errorText}>{error || 'Campaign not found'}</Text>
                    <TouchableOpacity style={styles.retryButton} onPress={fetchCampaignData}>
                        <Text style={styles.retryButtonText}>Retry</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Header Image with Back Button */}
                <View style={styles.imageContainer}>
                    <Image source={campaign.image} style={styles.campaignImage} />

                    {/* Gradient Overlay */}
                    <View style={styles.gradientOverlay} />

                    {/* Back Button */}
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={handleBackPress}
                        activeOpacity={0.8}
                    >
                        <Ionicons name="chevron-back" size={28} color={COLORS.white} />
                    </TouchableOpacity>
                </View>

                {/* Content Container */}
                <View style={styles.contentContainer}>
                    {/* Campaign Title */}
                    <Text style={styles.campaignTitle}>{campaign.title}</Text>

                    {/* Organization Info */}
                    <View style={styles.organizationContainer}>
                        <View style={styles.organizationInfo}>
                            <Ionicons name="shield-checkmark" size={20} color={COLORS.primary} />
                            <View style={styles.organizationTextContainer}>
                                <Text style={styles.organizationLabel}>Organizado por</Text>
                                <Text style={styles.organizationName}>{campaign.organizationName}</Text>
                            </View>
                        </View>
                        <View style={styles.verifiedBadge}>
                            <Ionicons name="checkmark-circle" size={16} color={COLORS.primary} />
                            <Text style={styles.verifiedText}>Verificado</Text>
                        </View>
                    </View>

                    {/* Participants Info */}
                    <View style={styles.participantsContainer}>
                        <Ionicons name="people" size={16} color={COLORS.grey} />
                        <Text style={styles.participantsText}>
                            {campaign.participants}+ personas donaron
                        </Text>
                    </View>

                    {/* Progress Section */}
                    <View style={styles.progressSection}>
                        {/* Progress Bar */}
                        <View style={styles.progressBarContainer}>
                            <View style={styles.progressBarBackground}>
                                <View
                                    style={[
                                        styles.progressBarFill,
                                        {
                                            width: `${campaign.progress}%`,
                                            backgroundColor: getProgressColor(campaign.category)
                                        }
                                    ]}
                                />
                            </View>
                        </View>

                        {/* Amount Info */}
                        <View style={styles.amountContainer}>
                            <View style={styles.amountItem}>
                                <Text style={styles.amountLabel}>Objetivo</Text>
                                <Text style={styles.amountValue}>€{campaign.goal.toLocaleString()}</Text>
                            </View>
                            <View style={styles.amountItem}>
                                <Text style={styles.amountLabel}>Recaudado</Text>
                                <Text style={styles.amountValue}>€{campaign.raised.toLocaleString()}</Text>
                            </View>
                        </View>
                    </View>

                    {/* Description Section */}
                    <View style={styles.descriptionSection}>
                        <Text style={styles.descriptionTitle}>Sobre esta campaña</Text>
                        <Text style={styles.descriptionText}>
                            {campaign.description}
                        </Text>
                    </View>

                    {/* Spacer for donate button */}
                    <View style={styles.spacer} />
                </View>
            </ScrollView>

            {/* Fixed Donate Button */}
            <View style={styles.donateButtonContainer}>
                <TouchableOpacity
                    style={styles.donateButton}
                    onPress={handleDonate}
                    activeOpacity={0.9}
                >
                    <Text style={styles.donateButtonText}>Donar</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        fontSize: SIZES.body1,
        fontFamily: FONTS.regular,
        color: COLORS.grey,
        marginTop: 16,
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
    },
    errorText: {
        fontSize: SIZES.h3,
        fontFamily: FONTS.medium,
        color: COLORS.grey,
        textAlign: 'center',
        marginTop: 16,
        marginBottom: 24,
    },
    retryButton: {
        backgroundColor: COLORS.primary,
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 8,
    },
    retryButtonText: {
        fontSize: SIZES.body1,
        fontFamily: FONTS.medium,
        color: COLORS.white,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 100, // Space for fixed donate button
    },
    imageContainer: {
        position: 'relative',
        height: 280,
        width: '100%',
    },
    campaignImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    gradientOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 100,
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    backButton: {
        position: 'absolute',
        top: StatusBar.currentHeight ? StatusBar.currentHeight + 15 : 45,
        left: 20,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentContainer: {
        flex: 1,
        backgroundColor: COLORS.white,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        marginTop: -25,
        paddingHorizontal: 24,
        paddingTop: 32,
    },
    campaignTitle: {
        fontSize: SIZES.h2,
        fontFamily: FONTS.bold,
        color: COLORS.black,
        marginBottom: 16,
        lineHeight: 32,
    },
    organizationContainer: {
        backgroundColor: COLORS.background,
        borderRadius: 16,
        padding: 16,
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        ...SHADOWS.light,
    },
    organizationInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    organizationTextContainer: {
        marginLeft: 10,
        flex: 1,
    },
    organizationLabel: {
        fontSize: SIZES.small,
        fontFamily: FONTS.regular,
        color: COLORS.grey,
    },
    organizationName: {
        fontSize: SIZES.medium,
        fontFamily: FONTS.semiBold,
        color: COLORS.black,
        marginTop: 2,
    },
    verifiedBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        ...SHADOWS.light,
    },
    verifiedText: {
        fontSize: SIZES.small,
        fontFamily: FONTS.medium,
        marginLeft: 4,
        color: COLORS.primary,
    },
    participantsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 32,
    },
    participantsText: {
        fontSize: SIZES.body2,
        fontFamily: FONTS.regular,
        color: COLORS.grey,
        marginLeft: 6,
    },
    progressSection: {
        marginBottom: 32,
    },
    progressBarContainer: {
        marginBottom: 24,
    },
    progressBarBackground: {
        height: 8,
        backgroundColor: COLORS.lightGrey,
        borderRadius: 4,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        borderRadius: 4,
    },
    amountContainer: {
        backgroundColor: COLORS.background,
        borderRadius: 16,
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        ...SHADOWS.light,
    },
    amountItem: {
        alignItems: 'center',
    },
    amountLabel: {
        fontSize: SIZES.body3,
        fontFamily: FONTS.regular,
        color: COLORS.grey,
        marginBottom: 4,
    },
    amountValue: {
        fontSize: SIZES.h3,
        fontFamily: FONTS.bold,
        color: COLORS.black,
    },
    descriptionSection: {
        marginBottom: 24,
    },
    descriptionTitle: {
        fontSize: SIZES.h4,
        fontFamily: FONTS.semiBold,
        color: COLORS.black,
        marginBottom: 12,
    },
    descriptionText: {
        fontSize: SIZES.body1,
        fontFamily: FONTS.regular,
        color: COLORS.grey,
        lineHeight: 24,
        textAlign: 'justify',
    },
    spacer: {
        height: 20,
    },
    donateButtonContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: COLORS.white,
        paddingHorizontal: 24,
        paddingTop: 16,
        paddingBottom: 24,
        borderTopWidth: 1,
        borderTopColor: COLORS.lightGrey,
    },
    donateButton: {
        backgroundColor: COLORS.black,
        borderRadius: 25,
        paddingVertical: 16,
        alignItems: 'center',
        justifyContent: 'center',
        ...SHADOWS.medium,
    },
    donateButtonText: {
        fontSize: SIZES.h4,
        fontFamily: FONTS.semiBold,
        color: COLORS.white,
    },
});

export default CampaignScreen;