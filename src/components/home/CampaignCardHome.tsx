import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { COLORS, FONTS, SIZES, SHADOWS } from '../../utils/constants';

interface CampaignCardProps {
    id: string;
    title: string;
    image: any;
    participants: number;
    onPress: () => void;
}

const CampaignCardHome: React.FC<CampaignCardProps> = ({
                                                       title,
                                                       image,
                                                       participants,
                                                       onPress,
                                                   }) => {
    return (
        <View style={styles.container}>
            <Image source={image} style={styles.image} />

            <View style={styles.infoContainer}>
                <View style={styles.textContainer}>
                    <Text style={styles.title} numberOfLines={2}>
                        {title}
                    </Text>
                    <Text style={styles.participants}>{participants} participantes</Text>
                </View>

                <TouchableOpacity style={styles.actionButton} onPress={onPress}>
                    <Text style={styles.actionButtonText}>›</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: SIZES.medium,
        marginHorizontal: SIZES.large,
        borderRadius: SIZES.medium,
        backgroundColor: COLORS.white,
        overflow: 'hidden',
        ...SHADOWS.medium,
    },
    image: {
        width: '100%',
        height: 180,
        resizeMode: 'cover',
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        padding: SIZES.medium,
        borderTopLeftRadius: SIZES.medium,
        borderTopRightRadius: SIZES.medium,
        marginTop: -20,
    },
    textContainer: {
        flex: 1,
        marginRight: SIZES.small,
    },
    title: {
        fontFamily: FONTS.semiBold,
        fontSize: SIZES.medium,
        color: COLORS.black,
        marginBottom: SIZES.base,
    },
    participants: {
        fontFamily: FONTS.regular,
        fontSize: SIZES.small,
        color: COLORS.grey,
    },
    actionButton: {
        width: 50,
        height: 50,
        backgroundColor: COLORS.primary,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    actionButtonText: {
        fontFamily: FONTS.bold,
        fontSize: SIZES.extraLarge,
        color: COLORS.white,
    },
});

export default CampaignCardHome;