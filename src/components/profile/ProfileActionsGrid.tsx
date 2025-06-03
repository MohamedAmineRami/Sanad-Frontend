import React from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';
import { SIZES } from '../../utils/constants';
import ProfileActionButton from './ProfileActionButton';

interface ProfileAction {
    id: string;
    icon: any;
    title: string;
    subtitle?: string;
    onPress: () => void;
}

interface ProfileActionsGridProps {
    actions: ProfileAction[];
}

const ProfileActionsGrid = ({ actions }: ProfileActionsGridProps) => {
    // Split actions into rows (first 2 for top row, next 2 for bottom row)
    const topRowActions = actions.slice(0, 2);
    const bottomRowActions = actions.slice(2, 4);

    return (
        <View style={styles.actionsContainer}>
            {/* Top Row */}
            <View style={styles.row}>
                {topRowActions.map((action) => (
                    <ProfileActionButton
                        key={action.id}
                        icon={action.icon}
                        title={action.title}
                        subtitle={action.subtitle}
                        onPress={action.onPress}
                    />
                ))}
            </View>

            {/* Bottom Row */}
            {bottomRowActions.length > 0 && (
                <View style={styles.row}>
                    {bottomRowActions.map((action) => (
                        <ProfileActionButton
                            key={action.id}
                            icon={action.icon}
                            title={action.title}
                            subtitle={action.subtitle}
                            onPress={action.onPress}
                        />
                    ))}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    actionsContainer: {
        flex: 1,
        paddingHorizontal: SIZES.medium,
        paddingTop: SIZES.extraLarge,
    },
    row: {
        flexDirection: 'row',
        marginBottom: SIZES.medium,
    },
});

export default ProfileActionsGrid;