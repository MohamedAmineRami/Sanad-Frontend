import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
} from 'react-native';
import { COLORS, FONTS, SIZES, SHADOWS } from '../../utils/constants';

interface ProfileHeaderProps {
    name: string;
    avatar?: any; // Optional custom avatar image
}

const ProfileHeader = ({ name, avatar }: ProfileHeaderProps) => {
    return (
        <View style={styles.headerContainer}>
            {/* Top Logo */}
            <Image
                source={require('../../assets/bird-logo.png')}
                style={styles.headerLogo}
                resizeMode="contain"
            />

            {/* Profile Info Section */}
            <View style={styles.profileInfo}>
                {/* Avatar Container */}
                <View style={styles.avatarContainer}>
                    <View style={styles.avatar}>
                        {avatar ? (
                            <Image
                                source={avatar}
                                style={styles.avatarImage}
                                resizeMode="cover"
                            />
                        ) : (
                            <Image
                                source={require('../../assets/user-icon.png')}
                                style={styles.avatarIcon}
                                resizeMode="contain"
                            />
                        )}
                    </View>
                </View>

                {/* Name Container */}
                <View style={styles.nameContainer}>
                    <Text style={styles.profileName}>{name}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        paddingHorizontal: SIZES.large,
        paddingTop: SIZES.extraLarge,
        paddingBottom: SIZES.medium,
    },
    headerLogo: {
        width: 32,
        height: 32,
        tintColor: COLORS.primary,
        marginBottom: SIZES.extraLarge,
    },
    profileInfo: {
        alignItems: 'center',
    },
    avatarContainer: {
        marginBottom: SIZES.medium,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        ...SHADOWS.medium,
        overflow: 'hidden',
    },
    avatarImage: {
        width: '100%',
        height: '100%',
        borderRadius: 40,
    },
    avatarIcon: {
        width: 40,
        height: 40,
        tintColor: COLORS.white,
    },
    nameContainer: {
        alignItems: 'center',
    },
    profileName: {
        fontSize: SIZES.extraLarge,
        fontFamily: FONTS.semiBold,
        color: COLORS.black,
        textAlign: 'center',
    },
});

export default ProfileHeader;