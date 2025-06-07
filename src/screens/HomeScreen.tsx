import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, ScrollView, StyleSheet, StatusBar } from 'react-native';
import { COLORS, SIZES } from '../utils/constants';
import HomeHeader from '../components/home/HomeHeader';
import ActivitySection from '../components/home/ActivitySection';
import CategoriesSection from '../components/home/CategoriesSection';
import CampaignCardHome from '../components/home/CampaignCardHome';
import { TabNavigationProps } from '../types/navigation-types';
import { Campaign, BackendCampaign, transformCampaign } from '../types/campaign';
import ApiService from '../services/api';

// Dummy data (can be moved or replaced later as well)
const recentActivities = [
    {
        id: '1',
        type: 'donation',
        message: 'Raquel donó a "Ayuda en Palestina"',
        icon: 'user',
    },
    {
        id: '2',
        type: 'campaign',
        message: 'Nueva campaña: "Alimentar a los niños palest..."',
        icon: 'group',
    },
];

const categories = [
    {
        id: '1',
        name: 'Comida',
        icon: 'food' as const,
        categoryKey: 'food', // Maps to backend category
    },
    {
        id: '2',
        name: 'Agua',
        icon: 'water' as const,
        categoryKey: 'water',
    },
    {
        id: '3',
        name: 'Educacion',
        icon: 'education' as const,
        categoryKey: 'education',
    },
    {
        id: '4',
        name: 'Otros',
        icon: 'other' as const,
        categoryKey: 'other',
    },
];

const HomeScreen = ({ navigation }: TabNavigationProps<'Home'>) => {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    const [featuredCampaign, setFeaturedCampaign] = useState<Campaign | null>(null);
    const [loading, setLoading] = useState(false);

    // Load all campaigns on component mount (for featured campaign)
    useEffect(() => {
        loadAllCampaigns();
    }, []);

    // Load campaigns when category changes
    useEffect(() => {
        if (selectedCategory) {
            loadCampaignsByCategory();
        }
    }, [selectedCategory]);

    const loadAllCampaigns = async () => {
        try {
            setLoading(true);
            const backendCampaigns: BackendCampaign[] = await ApiService.getCampaigns();
            const transformedCampaigns = backendCampaigns.map(transformCampaign);

            // Set the first campaign as featured
            if (transformedCampaigns.length > 0) {
                setFeaturedCampaign(transformedCampaigns[0]);
            }
        } catch (error) {
            console.error('Error loading campaigns:', error);
        } finally {
            setLoading(false);
        }
    };

    const loadCampaignsByCategory = async () => {
        if (!selectedCategory) return;

        try {
            setLoading(true);
            // Find the category key from the selected category
            const selectedCategoryData = categories.find(cat => cat.id === selectedCategory);
            if (!selectedCategoryData) return;

            const backendCampaigns: BackendCampaign[] = await ApiService.getCampaignsByCategory(selectedCategoryData.categoryKey);
            const transformedCampaigns = backendCampaigns.map(transformCampaign);
            setCampaigns(transformedCampaigns);
        } catch (error) {
            console.error('Error loading campaigns by category:', error);
            setCampaigns([]); // Clear campaigns on error
        } finally {
            setLoading(false);
        }
    };

    const handleCategorySelect = (category: any) => {
        // Toggle category selection
        if (selectedCategory === category.id) {
            setSelectedCategory(null); // Deselect if already selected
            setCampaigns([]); // Clear campaigns when deselecting
        } else {
            setSelectedCategory(category.id); // Select new category
        }
    };

    const handleCampaignPress = (campaignId: string) => {
        // Navigate to campaign details screen
        navigation.navigate('CampaignDetails', { id: campaignId });
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

            <ScrollView showsVerticalScrollIndicator={false}>
                <HomeHeader userName="Mohamed Amine" />

                <ActivitySection activities={recentActivities} />

                <CategoriesSection
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onSelectCategory={handleCategorySelect}
                    onCampaignPress={handleCampaignPress}
                    campaigns={campaigns} // Pass the fetched campaigns
                    loading={loading} // Pass loading state
                />

                {/* Show featured campaign only when no category is selected */}
                {!selectedCategory && featuredCampaign && (
                    <CampaignCardHome
                        id={featuredCampaign.id}
                        title={featuredCampaign.title}
                        image={featuredCampaign.image}
                        participants={featuredCampaign.participants}
                        onPress={() => handleCampaignPress(featuredCampaign.id)}
                    />
                )}

                <View style={{ height: 20 }} />
            </ScrollView>

            {/* Bottom Navigation Bar - This will be added via React Navigation */}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        paddingTop: StatusBar.currentHeight || 0, // Use StatusBar.currentHeight for Android
    },
});

export default HomeScreen;