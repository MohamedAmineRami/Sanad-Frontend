import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, FONTS, SIZES } from '../../utils/constants';

interface HomeHeaderProps {
    userName: string;
    onViewProfile?: () => void;
    onViewNotifications?: () => void;
}

const HomeHeader: React.FC<HomeHeaderProps> = ({
                                                   userName,
                                                   onViewProfile,
                                               }) => {
    return (
        <View style={styles.container}>
            {/* User Greeting and Avatar */}
            <View style={styles.userContainer}>
                <TouchableOpacity onPress={onViewProfile} style={styles.avatarContainer}>
                    <Image
                        source={require('../../assets/default-avatar.png')}
                        style={styles.avatar}
                    />
                </TouchableOpacity>
                <View style={styles.greetingContainer}>
                    <Text style={styles.greeting}>Hola,</Text>
                    <Text style={styles.userName}>{userName}</Text>
                    <Text style={styles.subGreeting}>¿Qué quieres cambiar hoy?</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: SIZES.large,
        paddingTop: SIZES.large,
        paddingBottom: SIZES.medium,
    },
    userContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatarContainer: {
        marginRight: SIZES.medium,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: COLORS.primary,
    },
    greetingContainer: {
        flex: 1,
    },
    greeting: {
        fontFamily: FONTS.regular,
        fontSize: SIZES.font,
        color: COLORS.grey,
    },
    userName: {
        fontFamily: FONTS.bold,
        fontSize: SIZES.extraLarge,
        color: COLORS.black,
        marginVertical: 2,
    },
    subGreeting: {
        fontFamily: FONTS.regular,
        fontSize: SIZES.small,
        color: COLORS.grey,
    },
    notificationButton: {
        position: 'relative',
        padding: SIZES.base,
    },
    notificationBadge: {
        position: 'absolute',
        top: 8,
        right: 8,
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    iconImage: {
        width: 24,
        height: 24,
        tintColor: COLORS.grey,
    },
});

export default HomeHeader;