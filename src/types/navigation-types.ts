import { StackNavigationProp } from '@react-navigation/stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';

// Define the parameter list for the stack navigation
export type RootStackParamList = {
    Splash: undefined;
    Login: undefined;
    Register: undefined;
    MainTabs: undefined;
    CampaignDetails: { id: string };
    Donation: { campaignId: string };
    Campaigns: undefined;
    // Profile-related screens
    Account: undefined;
    HelpCenter: undefined;
    InviteFriends: undefined;
    AboutSanad: undefined;
};

// Define the parameter list for the tab navigation
export type TabParamList = {
    Home: undefined;
    Campaigns: undefined;
    Profile: undefined;
};

// Define the props for the tab navigation
export type TabNavigationProps<T extends keyof TabParamList> = {
    navigation: CompositeNavigationProp<
        BottomTabNavigationProp<TabParamList, T>,
        StackNavigationProp<RootStackParamList>
    >;
    route: RouteProp<TabParamList, T>;
};

// Define the props for screens in the stack that are not tabs
export type StackScreenProps<T extends keyof RootStackParamList> = {
    navigation: StackNavigationProp<RootStackParamList, T>;
    route: RouteProp<RootStackParamList, T>;
};

// For backward compatibility, keep NavigationProps but point to the correct type
export type NavigationProps<T extends keyof RootStackParamList> = StackScreenProps<T>;