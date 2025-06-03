import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { COLORS, FONTS, SIZES } from '../../utils/constants';
import CampaignsCard, { Campaign } from './CampaignsCard';

interface CampaignsListProps {
    campaigns: Campaign[];
    onCampaignPress: (campaignId: string) => void;
}

const CampaignsList = ({ campaigns, onCampaignPress }: CampaignsListProps) => {
    return (
        <ScrollView
            style={styles.campaignsList}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.campaignsContainer}
        >
            {campaigns.map((campaign) => (
                <CampaignsCard
                    key={campaign.id}
                    campaign={campaign}
                    onPress={onCampaignPress}
                />
            ))}

            {campaigns.length === 0 && (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>
                        No se encontraron campañas
                    </Text>
                </View>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    campaignsList: {
        flex: 1,
    },
    campaignsContainer: {
        paddingHorizontal: SIZES.large,
        paddingBottom: SIZES.extraLarge,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: SIZES.extraLarge * 2,
    },
    emptyText: {
        fontSize: SIZES.large,
        fontFamily: FONTS.medium,
        color: COLORS.grey,
        textAlign: 'center',
    },
});

export default CampaignsList;