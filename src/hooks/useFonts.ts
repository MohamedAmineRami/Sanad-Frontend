import { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import {
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function useFonts() {
    const [fontsLoaded, setFontsLoaded] = useState(false);

    useEffect(() => {
        async function loadFonts() {
            try {
                await Font.loadAsync({
                    Poppins_400Regular,
                    Poppins_500Medium,
                    Poppins_600SemiBold,
                    Poppins_700Bold,
                });
                setFontsLoaded(true);
            } catch (e) {
                console.warn(e);
            } finally {
                await SplashScreen.hideAsync();
            }
        }

        loadFonts();
    }, []);

    return fontsLoaded;
}