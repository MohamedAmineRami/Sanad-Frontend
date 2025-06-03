import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, FONTS, SIZES } from '../../utils/constants';

interface CampaignInfoProps {
    title: string;
    progress: number;
    raised: number;
}

export const CampaignInfo = ({ title, progress, raised }: CampaignInfoProps) => {
    return (
        <View style={styles.campaignInfo}>
            <Text style={styles.campaignTitle}>{title}</Text>
            <Text style={styles.campaignProgress}>
                {progress}% completado • €{raised.toLocaleString()} recaudado
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    campaignInfo: {
        alignItems: 'center',
        marginBottom: 20,
    },
    campaignTitle: {
        fontSize: SIZES.h4,
        fontFamily: FONTS.semiBold,
        color: COLORS.white,
        textAlign: 'center',
        marginBottom: 8,
    },
    campaignProgress: {
        fontSize: SIZES.body3,
        fontFamily: FONTS.regular,
        color: COLORS.white,
        opacity: 0.8,
        textAlign: 'center',
    },
});