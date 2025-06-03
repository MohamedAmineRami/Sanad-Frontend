import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, FONTS, SIZES } from '../../utils/constants';

interface AmountDisplayProps {
    amount: number;
}

export const AmountDisplay = ({ amount }: AmountDisplayProps) => {
    return (
        <View style={styles.amountContainer}>
            <Text style={styles.currencySymbol}>€</Text>
            <Text style={styles.amountText}>{amount.toFixed(2)}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    amountContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
        marginBottom: 40,
    },
    currencySymbol: {
        fontSize: SIZES.h2,
        fontFamily: FONTS.bold,
        color: COLORS.white,
        marginRight: 8,
    },
    amountText: {
        fontSize: 72,
        fontFamily: FONTS.bold,
        color: COLORS.white,
    },
});