import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    Alert,
    ActivityIndicator,
} from 'react-native';
import { COLORS, FONTS, SIZES } from '../utils/constants';
import { NavigationProps } from '../types/navigation-types';
import { Campaign, BackendCampaign, transformCampaign } from '../types/campaign';
import { DonationRequest} from '../types/donation';
import ApiService from '../services/api';

// Import modular components
import { DonateHeader } from '../components/donate/DonateHeader';
import { AmountDisplay } from '../components/donate/AmountDisplay';
import { QuickAmountButtons } from '../components/donate/QuickAmountButtons';
import { DonationSlider } from '../components/donate/DonationSlider';
import { CustomAmountInput } from '../components/donate/CustomAmountInput';
import { CampaignInfo } from '../components/donate/CampaignInfo';
import { DonateButton } from '../components/donate/DonateButton';

interface DonateScreenProps extends NavigationProps<'Donation'> {}

const DonateScreen = ({ navigation, route }: DonateScreenProps) => {
    const { campaignId } = route.params;
    const [campaign, setCampaign] = useState<Campaign | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [donationAmount, setDonationAmount] = useState(250);
    const [customAmount, setCustomAmount] = useState('');
    const [isCustomInput, setIsCustomInput] = useState(false);
    const [isDonating, setIsDonating] = useState(false);

    // Configuration constants
    const QUICK_AMOUNTS = [50, 100, 250, 500, 1000];
    const MAX_AMOUNT = 2000;
    const MIN_AMOUNT = 10;
    const DEFAULT_AMOUNT = 250;

    // Fetch campaign data
    useEffect(() => {
        fetchCampaignData();
    }, [campaignId]);

    const fetchCampaignData = async () => {
        try {
            setLoading(true);
            setError(null);

            // Convert string id to number for API call
            const numericId = parseInt(campaignId.toString(), 10);
            const backendCampaign: BackendCampaign = await ApiService.getCampaignById(numericId);
            const transformedCampaign = transformCampaign(backendCampaign);

            setCampaign(transformedCampaign);
        } catch (err) {
            console.error('Error fetching campaign:', err);
            setError('Failed to load campaign details');
        } finally {
            setLoading(false);
        }
    };

    // Get background color based on campaign category
    const getBackgroundColor = (category: string) => {
        switch (category) {
            case 'food':
                return '#8C6E63'; // Light brown for food
            case 'water':
                return '#3498DB'; // Light blue for water
            case 'education':
                return '#F39C12'; // Light orange for education
            case 'other':
            default:
                return '#0C766A'; // Light teal default
        }
    };

    // Get the background color for the current campaign
    const backgroundColor = campaign ? getBackgroundColor(campaign.category) : COLORS.brownRose;

    useEffect(() => {
        setDonationAmount(DEFAULT_AMOUNT);
    }, []);

    // Event handlers
    const handleBackPress = () => {
        navigation.goBack();
    };

    const handleSliderChange = (value: number) => {
        if (!isCustomInput) {
            setDonationAmount(Math.round(value));
        }
    };

    const handleCustomAmountPress = () => {
        setIsCustomInput(true);
        setCustomAmount(donationAmount.toString());
    };

    const handleCustomAmountChange = (text: string) => {
        const numericValue = text.replace(/[^0-9]/g, '');
        setCustomAmount(numericValue);

        if (numericValue) {
            const amount = parseInt(numericValue);
            if (amount >= MIN_AMOUNT && amount <= MAX_AMOUNT) {
                setDonationAmount(amount);
            }
        }
    };

    const handleCustomAmountBlur = () => {
        if (customAmount) {
            const amount = parseInt(customAmount);
            if (amount < MIN_AMOUNT) {
                setDonationAmount(MIN_AMOUNT);
                setCustomAmount(MIN_AMOUNT.toString());
            } else if (amount > MAX_AMOUNT) {
                setDonationAmount(MAX_AMOUNT);
                setCustomAmount(MAX_AMOUNT.toString());
            }
        } else {
            setDonationAmount(DEFAULT_AMOUNT);
            setCustomAmount(DEFAULT_AMOUNT.toString());
        }
        setIsCustomInput(false);
    };

    const handleQuickAmountPress = (amount: number) => {
        setDonationAmount(amount);
        setIsCustomInput(false);
        setCustomAmount('');
    };

    const handleDonate = async () => {
        if (donationAmount < MIN_AMOUNT) {
            Alert.alert('Cantidad mínima', `La cantidad mínima de donación es €${MIN_AMOUNT}`);
            return;
        }

        if (!campaign) {
            Alert.alert('Error', 'No se encontró información de la campaña');
            return;
        }

        Alert.alert(
            'Confirmar Donación',
            `¿Confirmas tu donación de €${donationAmount} para "${campaign.title}"?`,
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Confirmar',
                    onPress: () => processDonation(),
                },
            ]
        );
    };

    const processDonation = async () => {
        if (!campaign) return;

        try {
            setIsDonating(true);

            const donationData: DonationRequest = {
                amount: donationAmount,
                currency: 'EUR',
                campaignId: parseInt(campaignId.toString(), 10),
                paymentMethod: 'CARD', // You can make this dynamic based on user selection
                anonymous: false, // You can add this as an option in the UI
            };

            const donation = await ApiService.createDonation(donationData);

            Alert.alert(
                '¡Gracias!',
                `Tu donación de €${donationAmount} ha sido procesada exitosamente.\n\nID de donación: ${donation.id.substring(0, 8)}...`,
                [
                    {
                        text: 'OK',
                        onPress: () => navigation.goBack(),
                    },
                ]
            );
        } catch (error) {
            console.error('Error creating donation:', error);
            Alert.alert(
                'Error',
                'Hubo un problema procesando tu donación. Por favor, inténtalo de nuevo.'
            );
        } finally {
            setIsDonating(false);
        }
    };

    // Loading state
    if (loading) {
        return (
            <SafeAreaView style={[styles.container, { backgroundColor: COLORS.brownRose }]}>
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={COLORS.white} />
                    <Text style={styles.loadingText}>Cargando campaña...</Text>
                </View>
            </SafeAreaView>
        );
    }

    // Error state
    if (error || !campaign) {
        return (
            <SafeAreaView style={[styles.container, { backgroundColor: COLORS.brownRose }]}>
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{error || 'Campaña no encontrada'}</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={[styles.container, { backgroundColor }]}>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

            {/* Header Component */}
            <DonateHeader onBackPress={handleBackPress} />

            {/* Main Content */}
            <View style={styles.content}>
                {/* Amount Display Component */}
                <AmountDisplay amount={donationAmount} />

                {/* Quick Amount Buttons Component */}
                <QuickAmountButtons
                    amounts={QUICK_AMOUNTS}
                    selectedAmount={donationAmount}
                    onAmountPress={handleQuickAmountPress}
                />

                {/* Donation Slider Component */}
                <DonationSlider
                    value={donationAmount}
                    minValue={MIN_AMOUNT}
                    maxValue={MAX_AMOUNT}
                    onValueChange={handleSliderChange}
                    disabled={isCustomInput}
                />

                {/* Custom Amount Input Component */}
                <CustomAmountInput
                    isCustomInput={isCustomInput}
                    customAmount={customAmount}
                    onPress={handleCustomAmountPress}
                    onChangeText={handleCustomAmountChange}
                    onBlur={handleCustomAmountBlur}
                />

                {/* Campaign Info Component */}
                <CampaignInfo
                    title={campaign.title}
                    progress={campaign.progress}
                    raised={campaign.raised}
                />
            </View>

            {/* Donate Button Component */}
            <DonateButton
                onPress={handleDonate}
                loading={isDonating}
                disabled={isDonating}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        fontSize: SIZES.body1,
        fontFamily: FONTS.regular,
        color: COLORS.white,
        marginTop: 16,
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
    },
    errorText: {
        fontSize: SIZES.h3,
        fontFamily: FONTS.medium,
        color: COLORS.white,
        textAlign: 'center',
    },
    content: {
        flex: 1,
        paddingHorizontal: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default DonateScreen;