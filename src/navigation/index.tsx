import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import CampaignsScreen from '../screens/CampaignsScreen';
import CampaignScreen from '../screens/CampaignScreen';
import DonateScreen from '../screens/DonateScreen';
import ProfileScreen from '../screens/ProfileScreen';
import TabBar from '../components/TabBar';
import { RootStackParamList } from '../types/navigation-types';

import AccountScreen from '../components/ProfileButtons/AccountScreen';
import HelpCenterScreen from '../components/ProfileButtons/HelpCenterScreen';
import InviteFriendsScreen from '../components/ProfileButtons/InviteFriendsScreen';
import AboutSanadScreen from '../components/ProfileButtons/AboutSanadScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator<RootStackParamList>();

function BottomTabNavigator() {
    return (
        <Tab.Navigator
            tabBar={(props) => <TabBar {...props} />}
            screenOptions={{
                headerShown: false,
            }}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Notifications" component={CampaignsScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
}

function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="MainTabs" component={BottomTabNavigator} />
                <Stack.Screen name="CampaignDetails" component={CampaignScreen} />
                <Stack.Screen name="Donation" component={DonateScreen} />

                {/* Profile-related screens */}
                <Stack.Screen name="Account" component={AccountScreen} />
                <Stack.Screen name="HelpCenter" component={HelpCenterScreen} />
                <Stack.Screen name="InviteFriends" component={InviteFriendsScreen} />
                <Stack.Screen name="AboutSanad" component={AboutSanadScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AppNavigator;