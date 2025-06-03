import React, { useState } from 'react';
import { SafeAreaView, View, ScrollView, StyleSheet, StatusBar } from 'react-native';
import { COLORS, SIZES } from '../utils/constants';
import HomeHeader from '../components/home/HomeHeader';
import ActivitySection from '../components/home/ActivitySection';
import CategoriesSection from '../components/home/CategoriesSection';
import CampaignCardHome from '../components/home/CampaignCardHome';
import { TabNavigationProps } from '../types/navigation-types';
import { campaignsData } from '../utils/campaignsData';

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
    },
    {
        id: '2',
        name: 'Agua',
        icon: 'water' as const,
    },
    {
        id: '3',
        name: 'Educacion',
        icon: 'education' as const,
    },
    {
        id: '4',
        name: 'Otros',
        icon: 'other' as const,
    },
];

// Use the first campaign from campaignsData as the featured campaign
const featuredCampaignFromData = campaignsData.length > 0 ? campaignsData[0] : null;

const HomeScreen = ({ navigation }: TabNavigationProps<'Home'>) => {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const handleCategorySelect = (category: any) => {
        // Toggle category selection
        if (selectedCategory === category.id) {
            setSelectedCategory(null); // Deselect if already selected
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
                />

                {/* Show featured campaign only when no category is selected */}
                {!selectedCategory && featuredCampaignFromData && (
                    <CampaignCardHome
                        id={featuredCampaignFromData.id}
                        title={featuredCampaignFromData.title}
                        image={featuredCampaignFromData.image}
                        participants={featuredCampaignFromData.participants}
                        onPress={() => handleCampaignPress(featuredCampaignFromData.id)}
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