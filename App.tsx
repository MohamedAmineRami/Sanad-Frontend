import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useFonts from './src/hooks/useFonts';
import SplashScreen from './src/screens/SplashScreen';
import AppNavigator from './src/navigation';
import { AuthProvider } from './src/context/AuthContext';

export default function App() {
    const [isLoading, setIsLoading] = useState(true);
    const fontsLoaded = useFonts();

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 3000); // 3 seconds

        return () => clearTimeout(timer);
    }, []);

    if (!fontsLoaded) {
        return <View />;
    }

    return (
        <SafeAreaProvider>
            <AuthProvider>
                {isLoading ? <SplashScreen /> : <AppNavigator />}
            </AuthProvider>
        </SafeAreaProvider>
    );
}