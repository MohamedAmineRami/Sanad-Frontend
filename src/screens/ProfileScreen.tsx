import React from 'react';
import {
    View,
    StyleSheet,
    SafeAreaView,
    StatusBar,
} from 'react-native';
import { COLORS } from '../utils/constants';
import { TabNavigationProps } from '../types/navigation-types';
import ProfileHeader from '../components/profile/ProfileHeader';
import ProfileActionsGrid from '../components/profile/ProfileActionsGrid';
import { useAuth } from '../context/AuthContext'; // Import useAuth hook

const ProfileScreen = ({ navigation }: TabNavigationProps<'Profile'>) => {
    const { user } = useAuth(); // Get the authenticated user

    // Define profile actions data with navigation
    const profileActions = [
        {
            id: 'account',
            icon: require('../assets/user-icon.png'),
            title: 'Mi Cuenta',
            onPress: () => {
                console.log('Mi Cuenta pressed');
                navigation.navigate('Account');
            },
        },
        {
            id: 'help',
            icon: require('../assets/help-icon.png'),
            title: 'Centro de Ayuda',
            onPress: () => {
                console.log('Centro de Ayuda pressed');
                navigation.navigate('HelpCenter');
            },
        },
        {
            id: 'invite',
            icon: require('../assets/invite-icon.png'),
            title: 'Invita Amigos',
            onPress: () => {
                console.log('Invita Amigos pressed');
                navigation.navigate('InviteFriends');
            },
        },
        {
            id: 'about',
            icon: require('../assets/bird-logo.png'),
            title: 'Sobre Sanad',
            onPress: () => {
                console.log('Sobre Sanad pressed');
                navigation.navigate('AboutSanad');
            },
        },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

            {/* Profile Header */}
            <ProfileHeader name={user?.name || 'Usuario'} />

            {/* Profile Actions Grid */}
            <ProfileActionsGrid actions={profileActions} />

            {/* Bottom Tab Placeholder */}
            <View style={styles.tabPlaceholder} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        paddingTop: StatusBar.currentHeight || 0,
    },
    tabPlaceholder: {
        height: 80, // Space for the bottom tab bar
    },
});

export default ProfileScreen;