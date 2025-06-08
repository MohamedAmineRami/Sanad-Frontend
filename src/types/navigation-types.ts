import { StackNavigationProp } from '@react-navigation/stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';

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

export type TabParamList = {
    Home: undefined;
    Campaigns: undefined;
    Profile: undefined;
};

export type TabNavigationProps<T extends keyof TabParamList> = {
    navigation: CompositeNavigationProp<
        BottomTabNavigationProp<TabParamList, T>,
        StackNavigationProp<RootStackParamList>
    >;
    route: RouteProp<TabParamList, T>;
};

export type StackScreenProps<T extends keyof RootStackParamList> = {
    navigation: StackNavigationProp<RootStackParamList, T>;
    route: RouteProp<RootStackParamList, T>;
};



export type NavigationProps<T extends keyof RootStackParamList> = StackScreenProps<T>;