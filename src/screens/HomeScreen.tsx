import React, { useState, useEffect, useCallback } from 'react';
import { SafeAreaView, View, ScrollView, StyleSheet, StatusBar } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { COLORS } from '../utils/constants';
import HomeHeader from '../components/home/HomeHeader';
import ActivitySection from '../components/home/ActivitySection';
import CategoriesSection from '../components/home/CategoriesSection';
import CampaignCardHome from '../components/home/CampaignCardHome';
import { TabNavigationProps } from '../types/navigation-types';
import { Campaign, BackendCampaign, transformCampaign } from '../types/campaign';
import { ActivityItem, transformActivity } from '../types/activity';
import ApiService from '../services/api';
import { useAuth } from '../context/AuthContext';

const categories = [
    {
        id: '1',
        name: 'Comida',
        icon: 'food' as const,
        categoryKey: 'food',
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
    const { user } = useAuth();
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    const [featuredCampaign, setFeaturedCampaign] = useState<Campaign | null>(null);
    const [activities, setActivities] = useState<ActivityItem[]>([]);
    const [loading, setLoading] = useState(false);

    // Load all campaigns and activities on component mount
    useEffect(() => {
        loadAllCampaigns();
        loadRecentActivities();
    }, []);

    // Refresh activities every time the screen comes into focus
    useFocusEffect(
        useCallback(() => {
            console.log('🔄 Home screen focused - refreshing activities');
            loadRecentActivities();
        }, [])
    );

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

    const loadRecentActivities = async () => {
        try {
            const recentActivities = await ApiService.getRecentActivities(3);
            const transformedActivities = recentActivities.map(transformActivity);
            console.log(' Final transformed activities:', transformedActivities);
            setActivities(transformedActivities);
        } catch (error) {
            console.error(' Error loading activities:', error);
            setActivities([]);
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
        navigation.navigate('CampaignDetails', { id: campaignId });
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

            <ScrollView showsVerticalScrollIndicator={false}>
                <HomeHeader userName={user?.name || 'Usuario'} />

                <ActivitySection activities={activities} />

                <CategoriesSection
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onSelectCategory={handleCategorySelect}
                    onCampaignPress={handleCampaignPress}
                    campaigns={campaigns}
                    loading={loading}
                />

                {/* Show a featured campaign only when no category is selected */}
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

export default HomeScreen;