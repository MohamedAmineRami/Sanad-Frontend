import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Animated,
} from 'react-native';
import { COLORS, FONTS, SIZES, SHADOWS } from '../../utils/constants';

interface ProfileActionButtonProps {
    icon: any;
    title: string;
    subtitle?: string;
    onPress: () => void;
}

const ProfileActionButton = ({
                                 icon,
                                 title,
                                 subtitle,
                                 onPress
                             }: ProfileActionButtonProps) => {
    const [isPressed, setIsPressed] = useState(false);
    const scaleValue = new Animated.Value(1);
    const backgroundColorValue = new Animated.Value(0);

    const handlePressIn = () => {
        setIsPressed(true);
        Animated.parallel([
            Animated.spring(scaleValue, {
                toValue: 0.95,
                useNativeDriver: true,
            }),
            Animated.timing(backgroundColorValue, {
                toValue: 1,
                duration: 150,
                useNativeDriver: false,
            }),
        ]).start();
    };

    const handlePressOut = () => {
        setIsPressed(false);
        Animated.parallel([
            Animated.spring(scaleValue, {
                toValue: 1,
                friction: 3,
                useNativeDriver: true,
            }),
            Animated.timing(backgroundColorValue, {
                toValue: 0,
                duration: 150,
                useNativeDriver: false,
            }),
        ]).start();
    };

    const animatedStyle = {
        transform: [{ scale: scaleValue }],
    };

    const animatedBackgroundColor = backgroundColorValue.interpolate({
        inputRange: [0, 1],
        outputRange: [COLORS.white, COLORS.primary],
    });

    const getIconTintColor = () => {
        return isPressed ? COLORS.white : COLORS.primary;
    };

    const getTextColor = () => {
        return isPressed ? COLORS.white : COLORS.black;
    };

    const getSubtitleColor = () => {
        return isPressed ? COLORS.white : COLORS.grey;
    };

    const getIconBackgroundColor = () => {
        return isPressed ? 'rgba(255, 255, 255, 0.2)' : COLORS.background;
    };

    return (
        <Animated.View style={[animatedStyle, styles.buttonContainer]}>
            <Animated.View style={[
                styles.actionButton,
                { backgroundColor: animatedBackgroundColor }
            ]}>
                <TouchableOpacity
                    style={styles.touchableContent}
                    onPress={onPress}
                    onPressIn={handlePressIn}
                    onPressOut={handlePressOut}
                    activeOpacity={1}
                >
                    <View style={[
                        styles.iconContainer,
                        { backgroundColor: getIconBackgroundColor() }
                    ]}>
                        <Image
                            source={icon}
                            style={[
                                styles.actionIcon,
                                { tintColor: getIconTintColor() }
                            ]}
                            resizeMode="contain"
                        />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={[
                            styles.actionTitle,
                            { color: getTextColor() }
                        ]}>
                            {title}
                        </Text>
                        {subtitle && (
                            <Text style={[
                                styles.actionSubtitle,
                                { color: getSubtitleColor() }
                            ]}>
                                {subtitle}
                            </Text>
                        )}
                    </View>
                </TouchableOpacity>
            </Animated.View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        flex: 1,
        margin: SIZES.small,
    },
    actionButton: {
        backgroundColor: COLORS.white,
        borderRadius: 20,
        ...SHADOWS.light,
        overflow: 'hidden',
        minHeight: 120, // Increased height for a better UI
    },
    touchableContent: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: SIZES.large, // Increased padding
        minHeight: 120, // Increased minimum height
    },
    iconContainer: {
        width: 40, // Increased icon container size
        height: 40,
        borderRadius: 30,
        backgroundColor: COLORS.background,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: SIZES.medium,
    },
    actionIcon: {
        width: 50, // Increased icon size
        height: 30,
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    actionTitle: {
        fontSize: SIZES.font + 2, // Slightly larger font
        fontFamily: FONTS.medium,
        color: COLORS.black,
        marginBottom: 4,
    },
    actionSubtitle: {
        fontSize: SIZES.small,
        fontFamily: FONTS.regular,
        color: COLORS.grey,
    },
});

export default ProfileActionButton;