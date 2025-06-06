import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    ActivityIndicator,
    Alert,
    Text,
} from 'react-native';
import { COLORS } from '../utils/constants';
import { NavigationProps } from '../types/navigation-types';
import CampaignsHeader from '../components/campaigns/CampaignsHeader';
import CampaignsSearchBar from '../components/campaigns/CampaignsSearchBar';
import CampaignsList from '../components/campaigns/CampaignsList';
import ApiService from '../services/api';
import { Campaign, transformCampaign, BackendCampaign } from '../types/campaign';

const CampaignsScreen = ({ navigation }: NavigationProps<'Campaigns'>) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    const [filteredCampaigns, setFilteredCampaigns] = useState<Campaign[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchCampaigns();
    }, []);

    const fetchCampaigns = async () => {
        try {
            setLoading(true);
            setError(null);

            const backendCampaigns: BackendCampaign[] = await ApiService.getCampaigns();
            const transformedCampaigns = backendCampaigns.map(transformCampaign);

            setCampaigns(transformedCampaigns);
            setFilteredCampaigns(transformedCampaigns);
        } catch (err) {
            console.error('Error fetching campaigns:', err);
            setError('Error al cargar las campañas. Por favor, inténtalo de nuevo.');

            // Show alert to user
            Alert.alert(
                'Error',
                'No se pudieron cargar las campañas. Verifica tu conexión e inténtalo de nuevo.',
                [
                    { text: 'Reintentar', onPress: fetchCampaigns },
                    { text: 'Cancelar', style: 'cancel' }
                ]
            );
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        if (query.trim() === '') {
            setFilteredCampaigns(campaigns);
        } else {
            const filtered = campaigns.filter(campaign =>
                campaign.title.toLowerCase().includes(query.toLowerCase()) ||
                campaign.organizationName.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredCampaigns(filtered);
        }
    };

    const handleCampaignPress = (campaignId: string) => {
        navigation.navigate('CampaignDetails', { id: campaignId });
    };

    if (loading) {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
                <CampaignsHeader title="Campañas" />
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={COLORS.primary} />
                    <Text style={styles.loadingText}>Cargando campañas...</Text>
                </View>
            </SafeAreaView>
        );
    }

    if (error && campaigns.length === 0) {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
                <CampaignsHeader title="Campañas" />
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{error}</Text>
                    <Text style={styles.retryText} onPress={fetchCampaigns}>
                        Tocar para reintentar
                    </Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

            <CampaignsHeader title="Campañas" />

            <CampaignsSearchBar
                value={searchQuery}
                onChangeText={handleSearch}
                placeholder="Buscar campañas u organizaciones"
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
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: COLORS.primary,
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    errorText: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 10,
    },
    retryText: {
        fontSize: 16,
        color: COLORS.primary,
        textAlign: 'center',
        textDecorationLine: 'underline',
    },
});

export default CampaignsScreen;