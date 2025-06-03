import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, SHADOWS } from '../utils/constants';
import { HomeIcon, NotificationsIcon, ProfileIcon } from '../icons';

interface TabBarProps {
    state: any;
    descriptors: any;
    navigation: any;
}

const TabBar: React.FC<TabBarProps> = ({ state, descriptors, navigation }) => {
    return (
        <View style={styles.container}>
            {state.routes.map((route: any, index: number) => {
                const { options } = descriptors[route.key];
                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                let icon;
                switch (route.name) {
                    case 'Home':
                        icon = <HomeIcon size={28} focused={isFocused} />;
                        break;
                    case 'Notifications':
                        icon = <NotificationsIcon size={28} focused={isFocused} />;
                        break;
                    case 'Profile':
                        icon = <ProfileIcon size={28} focused={isFocused} />;
                        break;
                    default:
                        icon = <HomeIcon size={28} focused={isFocused} />;
                }

                return (
                    <TouchableOpacity
                        key={route.key}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        style={styles.tabButton}
                    >
                        {icon}
                        {isFocused && <View style={styles.indicator} />}
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: COLORS.white,
        height: 60,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: 10,
        ...SHADOWS.medium,
    },
    tabButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
    },
    indicator: {
        position: 'absolute',
        bottom: 5,
        width: 5,
        height: 5,
        borderRadius: 2.5,
        backgroundColor: COLORS.primary,
    },
});

export default TabBar;