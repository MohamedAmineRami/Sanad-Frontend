import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import { COLORS, FONTS, SIZES } from '../../utils/constants';

interface DonationSliderProps {
    value: number;
    minValue: number;
    maxValue: number;
    onValueChange: (value: number) => void;
    disabled?: boolean;
}

export const DonationSlider = ({
                                   value,
                                   minValue,
                                   maxValue,
                                   onValueChange,
                                   disabled = false
                               }: DonationSliderProps) => {
    return (
        <View style={styles.sliderContainer}>
            <Slider
                style={styles.slider}
                minimumValue={minValue}
                maximumValue={maxValue}
                value={value}
                onValueChange={onValueChange}
                minimumTrackTintColor={COLORS.white}
                maximumTrackTintColor={COLORS.sliderTrack}
                thumbStyle={styles.sliderThumb}
                trackStyle={styles.sliderTrack}
                disabled={disabled}
            />
            <View style={styles.sliderLabels}>
                <Text style={styles.sliderLabel}>€{minValue}</Text>
                <Text style={styles.sliderLabel}>€{maxValue}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    sliderContainer: {
        width: '100%',
        marginBottom: 40,
    },
    slider: {
        width: '100%',
        height: 40,
    },
    sliderThumb: {
        backgroundColor: COLORS.sliderThumb,
        width: 24,
        height: 24,
    },
    sliderTrack: {
        height: 4,
        borderRadius: 2,
    },
    sliderLabels: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
        paddingHorizontal: 12,
    },
    sliderLabel: {
        fontSize: SIZES.body4,
        fontFamily: FONTS.regular,
        color: COLORS.white,
        opacity: 0.8,
    },
});