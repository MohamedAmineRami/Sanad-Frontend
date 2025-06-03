import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useFonts from './src/hooks/useFonts';
import SplashScreen from './src/screens/SplashScreen';
import AppNavigator from './src/navigation';

export default function App() {
    const [isLoading, setIsLoading] = useState(true);
    const fontsLoaded = useFonts();

    useEffect(() => {
        // Simulate a loading process
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 3000); // 3 seconds

        return () => clearTimeout(timer);
    }, []);

    if (!fontsLoaded) {
        return <View />; // Return an empty view while fonts are loading
    }

    return (
        <SafeAreaProvider>
            {isLoading ? <SplashScreen /> : <AppNavigator />}
        </SafeAreaProvider>
    );
}