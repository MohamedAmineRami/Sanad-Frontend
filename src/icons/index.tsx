import React from 'react';
import { View, Image } from 'react-native';

// Home Icon Component
export const HomeIcon = ({ size = 24, color = '#0C766A', focused = false }) => {
    return (
        <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
            <Image
                source={require('../assets/home-icon.png')}
                style={{
                    width: size * 0.75,
                    height: size * 0.75,
                    tintColor: focused ? color : '#CBDCF4'
                }}
                resizeMode="contain"
            />
        </View>
    );
};

// Notifications Icon Component
export const NotificationsIcon = ({ size = 24, color = '#0C766A', focused = false }) => {
    return (
        <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
            <Image
                source={require('../assets/notifications-icon.png')}
                style={{
                    width: size * 0.75,
                    height: size * 0.75,
                    tintColor: focused ? color : '#CBDCF4'
                }}
                resizeMode="contain"
            />
        </View>
    );
};

// Profile Icon Component
export const ProfileIcon = ({ size = 24, color = '#0C766A', focused = false }) => {
    return (
        <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
            <Image
                source={require('../assets/profile-icon.png')}
                style={{
                    width: size * 0.75,
                    height: size * 0.75,
                    tintColor: focused ? color : '#CBDCF4'
                }}
                resizeMode="contain"
            />
        </View>
    );
};