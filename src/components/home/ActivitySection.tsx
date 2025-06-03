import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { COLORS, FONTS, SIZES } from '../../utils/constants';

interface ActivityItem {
    id: string;
    type: 'donation' | 'campaign';
    message: string;
    icon: 'user' | 'group';
}

interface ActivitySectionProps {
    activities: ActivityItem[];
}

const ActivitySection: React.FC<ActivitySectionProps> = ({ activities }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.sectionTitle}>Actividad Reciente</Text>

            {activities.map((activity) => (
                <View key={activity.id} style={styles.activityItem}>
                    <View style={styles.activityIcon}>
                        <Image
                            source={
                                activity.icon === 'user'
                                    ? require('../../assets/user-icon.png')
                                    : require('../../assets/group-icon.png')
                            }
                            style={styles.iconImage}
                        />
                    </View>
                    <Text style={styles.activityText} numberOfLines={1}>
                        {activity.message}
                    </Text>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.primary,
        padding: SIZES.medium,
        borderRadius: SIZES.base,
        marginHorizontal: SIZES.large,
    },
    sectionTitle: {
        fontFamily: FONTS.semiBold,
        fontSize: SIZES.medium,
        color: COLORS.white,
        marginBottom: SIZES.small,
    },
    activityItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: SIZES.base,
        padding: SIZES.small,
        marginVertical: SIZES.base / 2,
    },
    activityIcon: {
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: SIZES.base,
    },
    iconImage: {
        width: 18,
        height: 18,
        tintColor: COLORS.white,
    },
    activityText: {
        fontFamily: FONTS.regular,
        fontSize: SIZES.font,
        color: COLORS.white,
        flex: 1,
    },
});

export default ActivitySection;