import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS, FONTS, SIZES } from '../../utils/constants';

interface DonateButtonProps {
    onPress: () => void;
    text?: string;
    loading?: any;
    disabled?: any;
}

export const DonateButton = ({ onPress, text = "Enviar" }: DonateButtonProps) => {
    return (
        <View style={styles.donateButtonContainer}>
            <TouchableOpacity
                style={styles.donateButton}
                onPress={onPress}
                activeOpacity={0.9}
            >
                <Text style={styles.donateButtonText}>{text}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    donateButtonContainer: {
        paddingHorizontal: 24,
        paddingBottom: 24,
        paddingTop: 16,
    },
    donateButton: {
        backgroundColor: COLORS.black,
        borderRadius: 25,
        paddingVertical: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    donateButtonText: {
        fontSize: SIZES.h4,
        fontFamily: FONTS.semiBold,
        color: COLORS.white,
    },
});