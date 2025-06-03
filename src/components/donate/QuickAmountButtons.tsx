import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS, FONTS, SIZES } from '../../utils/constants';

interface QuickAmountButtonsProps {
    amounts: number[];
    selectedAmount: number;
    onAmountPress: (amount: number) => void;
}

export const QuickAmountButtons = ({
                                       amounts,
                                       selectedAmount,
                                       onAmountPress
                                   }: QuickAmountButtonsProps) => {
    return (
        <View style={styles.quickAmountsContainer}>
            {amounts.map((amount) => (
                <TouchableOpacity
                    key={amount}
                    style={[
                        styles.quickAmountButton,
                        selectedAmount === amount && styles.quickAmountButtonActive
                    ]}
                    onPress={() => onAmountPress(amount)}
                    activeOpacity={0.8}
                >
                    <Text
                        style={[
                            styles.quickAmountText,
                            selectedAmount === amount && styles.quickAmountTextActive
                        ]}
                    >
                        €{amount}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    quickAmountsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: 40,
        paddingHorizontal: 20,
    },
    quickAmountButton: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 25,
        margin: 6,
        minWidth: 80,
        alignItems: 'center',
    },
    quickAmountButtonActive: {
        backgroundColor: COLORS.white,
    },
    quickAmountText: {
        fontSize: SIZES.body2,
        fontFamily: FONTS.medium,
        color: COLORS.white,
    },
    quickAmountTextActive: {
        color: COLORS.brownRose,
    },
});