import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    Alert,
} from 'react-native';
import { COLORS, FONTS, SIZES } from '../utils/constants';
import { NavigationProps } from '../types/navigation-types';
import { campaignsData } from '../utils/campaignsData';

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
    const [donationAmount, setDonationAmount] = useState(250);
    const [customAmount, setCustomAmount] = useState('');
    const [isCustomInput, setIsCustomInput] = useState(false);

    // Configuration constants
    const QUICK_AMOUNTS = [50, 100, 250, 500, 1000];
    const MAX_AMOUNT = 2000;
    const MIN_AMOUNT = 10;
    const DEFAULT_AMOUNT = 250;

    // Find the campaign data by id
    const campaign = campaignsData.find(c => c.id === campaignId);

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

    const handleDonate = () => {
        if (donationAmount < MIN_AMOUNT) {
            Alert.alert('Cantidad mínima', `La cantidad mínima de donación es €${MIN_AMOUNT}`);
            return;
        }

        Alert.alert(
            'Confirmar Donación',
            `¿Confirmas tu donación de €${donationAmount} para "${campaign?.title}"?`,
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Confirmar',
                    onPress: () => {
                        // Here you would integrate with the payment gateway
                        Alert.alert(
                            '¡Gracias!',
                            'Tu donación ha sido procesada exitosamente.',
                            [
                                {
                                    text: 'OK',
                                    onPress: () => navigation.goBack(),
                                },
                            ]
                        );
                    },
                },
            ]
        );
    };

    // Error state
    if (!campaign) {
        return (
            <SafeAreaView style={[styles.container, { backgroundColor: COLORS.brownRose }]}>
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>Campaña no encontrada</Text>
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
            <DonateButton onPress={handleDonate} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        fontSize: SIZES.h3,
        fontFamily: FONTS.medium,
        color: COLORS.black,
    },
    content: {
        flex: 1,
        paddingHorizontal: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default DonateScreen;