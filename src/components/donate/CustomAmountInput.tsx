import React from 'react';
import { TouchableOpacity, TextInput, Text, StyleSheet, Dimensions } from 'react-native';
import { COLORS, FONTS, SIZES } from '../../utils/constants';

const { width } = Dimensions.get('window');

interface CustomAmountInputProps {
    isCustomInput: boolean;
    customAmount: string;
    onPress: () => void;
    onChangeText: (text: string) => void;
    onBlur: () => void;
}

export const CustomAmountInput = ({
                                      isCustomInput,
                                      customAmount,
                                      onPress,
                                      onChangeText,
                                      onBlur
                                  }: CustomAmountInputProps) => {
    return (
        <TouchableOpacity
            style={styles.customAmountButton}
            onPress={onPress}
            activeOpacity={0.8}
            disabled={isCustomInput}
        >
            {isCustomInput ? (
                <TextInput
                    style={styles.customAmountInput}
                    value={customAmount}
                    onChangeText={onChangeText}
                    onBlur={onBlur}
                    placeholder="Introduzca cantidad..."
                    placeholderTextColor={COLORS.introduzcaText}
                    keyboardType="numeric"
                    autoFocus
                    maxLength={5}
                />
            ) : (
                <Text style={styles.customAmountText}>Introduzca cantidad...</Text>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    customAmountButton: {
        backgroundColor: COLORS.introduzcaBackground,
        paddingHorizontal: 24,
        paddingVertical: 16,
        borderRadius: 25,
        width: width * 0.8,
        alignItems: 'center',
        marginBottom: 40,
    },
    customAmountText: {
        fontSize: SIZES.body1,
        fontFamily: FONTS.medium,
        color: COLORS.introduzcaText,
    },
    customAmountInput: {
        fontSize: SIZES.body1,
        fontFamily: FONTS.medium,
        color: COLORS.introduzcaText,
        textAlign: 'center',
        width: '100%',
    },
});