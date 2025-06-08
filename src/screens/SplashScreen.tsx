import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions, Image } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withDelay,
    Easing,
} from 'react-native-reanimated';
import { COLORS, FONTS, SIZES } from '../utils/constants';

const { width } = Dimensions.get('window');

const SplashScreen = () => {
    const birdOpacity = useSharedValue(0);
    const textTranslateX = useSharedValue(width);

    useEffect(() => {
        // Bird appears first
        birdOpacity.value = withTiming(1, {
            duration: 1200,
            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        });

        // Text slides in after the bird
        textTranslateX.value = withDelay(800, withTiming(0, {
            duration: 1000,
            easing: Easing.out(Easing.cubic),
        }));
    }, []);

    const birdAnimatedStyle = useAnimatedStyle(() => {
        return {
            opacity: birdOpacity.value,
        };
    });

    const textAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: textTranslateX.value }],
        };
    });

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                {/* Bird Logo */}
                <Animated.View style={[styles.birdContainer, birdAnimatedStyle]}>
                    <Image
                        source={require('../assets/bird-logo.png')}
                        style={styles.birdImage}
                        resizeMode="contain"
                    />
                </Animated.View>

                {/* Text "anad" */}
                <Animated.Text style={[styles.text, textAnimatedStyle]}>
                    anad
                </Animated.Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    birdContainer: {
        marginRight: -10,
    },
    birdImage: {
        width: 120,
        height: 120,
    },
    text: {
        fontSize: SIZES.xxxl,
        fontFamily: FONTS.bold,
        color: COLORS.primary,
        marginLeft: 10,
    },
});

export default SplashScreen;