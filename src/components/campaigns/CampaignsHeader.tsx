import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, FONTS, SIZES } from '../../utils/constants';

interface PageHeaderProps {
    title: string;
}

const CampaignsHeader = ({ title }: PageHeaderProps) => {
    return (
        <View style={styles.header}>
            <Text style={styles.headerTitle}>{title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: SIZES.large,
        paddingVertical: SIZES.medium,
        marginTop: SIZES.base,
    },
    headerTitle: {
        fontSize: SIZES.xxl,
        fontFamily: FONTS.bold,
        color: COLORS.black,
    },
});

export default CampaignsHeader;