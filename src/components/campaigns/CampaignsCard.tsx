import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SIZES, SHADOWS } from '../../utils/constants';

// Updated Campaign interface that matches your campaignsData structure
export interface Campaign {
    id: string;
    title: string;
    image: any; // require() for local images
    participants: number;
    progress: number; // percentage (0-100)
    category: 'food' | 'water' | 'education' | 'other';
    goal: number; // Required: total goal amount
    raised: number; // Required: amount raised so far
    description: string; // Required: campaign description
    organizationName: string; // Required: name of the organization
}

interface CampaignCardProps {
    campaign: Campaign;
    onPress: (id: string) => void;
}

const CampaignsCard = ({ campaign, onPress }: CampaignCardProps) => {
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

    const getBackgroundColor = (category: string) => {
        switch (category) {
            case 'food':
                return '#ded2d3';
            case 'water':
                return '#E8F4FD';
            case 'education':
                return '#FFF2E6';
            default:
                return '#d5edee'; // Light default color
        }
    };

    return (
        <TouchableOpacity
            style={[
                styles.campaignCard,
                { backgroundColor: getBackgroundColor(campaign.category) }
            ]}
            onPress={() => onPress(campaign.id)}
            activeOpacity={0.8}
        >
            <Image source={campaign.image} style={styles.campaignImage} />

            <View style={styles.campaignContent}>
                <Text style={styles.campaignTitle}>{campaign.title}</Text>

                {/* Organization Badge */}
                <View style={styles.organizationBadge}>
                    <Ionicons name="shield-checkmark" size={16} color={COLORS.primary} />
                    <Text style={styles.organizationText}>{campaign.organizationName}</Text>
                </View>

                <Text style={styles.participantsText}>
                    {campaign.participants} participantes
                </Text>

                {/* Progress Bar */}
                <View style={styles.progressContainer}>
                    <View style={styles.progressBackground}>
                        <View
                            style={[
                                styles.progressFill,
                                {
                                    width: `${campaign.progress}%`,
                                    backgroundColor: getProgressColor(campaign.category),
                                }
                            ]}
                        />
                    </View>
                    <Text style={styles.progressText}>
                        {campaign.progress}% completado
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    campaignCard: {
        borderRadius: 16,
        marginBottom: SIZES.medium,
        overflow: 'hidden',
        ...SHADOWS.light,
    },
    campaignImage: {
        width: '100%',
        height: 180,
        resizeMode: 'cover',
    },
    campaignContent: {
        padding: SIZES.medium,
    },
    campaignTitle: {
        fontSize: SIZES.large,
        fontFamily: FONTS.semiBold,
        color: COLORS.black,
        marginBottom: SIZES.small,
    },
    organizationBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        paddingHorizontal: SIZES.small,
        paddingVertical: 4,
        borderRadius: 12,
        alignSelf: 'flex-start',
        marginBottom: SIZES.small,
        ...SHADOWS.light,
    },
    organizationText: {
        fontSize: SIZES.small,
        fontFamily: FONTS.medium,
        color: COLORS.primary,
        marginLeft: 4,
    },
    participantsText: {
        fontSize: SIZES.font,
        fontFamily: FONTS.regular,
        color: COLORS.grey,
        marginBottom: SIZES.medium,
    },
    progressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    progressBackground: {
        flex: 1,
        height: 8,
        backgroundColor: COLORS.lightGrey,
        borderRadius: 4,
        marginRight: SIZES.medium,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        borderRadius: 4,
    },
    progressText: {
        fontSize: SIZES.small,
        fontFamily: FONTS.medium,
        color: COLORS.grey,
        minWidth: 100,
        textAlign: 'right',
    },
});

export default CampaignsCard;