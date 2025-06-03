import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    SafeAreaView,
    StatusBar,
} from 'react-native';
import { COLORS } from '../utils/constants';
import { NavigationProps } from '../types/navigation-types';
import CampaignsHeader from '../components/campaigns/CampaignsHeader';
import CampaignsSearchBar from '../components/campaigns/CampaignsSearchBar';
import CampaignsList from '../components/campaigns/CampaignsList';
import { campaignsData } from '../utils/campaignsData';

const CampaignsScreen = ({ navigation }: NavigationProps<'Home'>) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredCampaigns, setFilteredCampaigns] = useState(campaignsData);

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        if (query.trim() === '') {
            setFilteredCampaigns(campaignsData);
        } else {
            const filtered = campaignsData.filter(campaign =>
                campaign.title.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredCampaigns(filtered);
        }
    };

    const handleCampaignPress = (campaignId: string) => {
        // Navigate to campaign details screen
        navigation.navigate('CampaignDetails', { id: campaignId });
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

            <CampaignsHeader title="Campañas" />

            <CampaignsSearchBar
                value={searchQuery}
                onChangeText={handleSearch}
                placeholder="Buscar"
            />

            <CampaignsList
                campaigns={filteredCampaigns}
                onCampaignPress={handleCampaignPress}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        paddingTop: StatusBar.currentHeight || 0,
    },
});

export default CampaignsScreen;