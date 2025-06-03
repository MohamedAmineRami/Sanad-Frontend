export const COLORS = {
    primary: '#0C766A',
    secondary: '#w',
    accent: '#F26969',
    background: '#F5F5F5',
    screenBackgroundDark: '#000000',

    white: '#FFFFFF',
    black: '#000000',
    grey: '#666666',
    lightGrey: '#E0E0E0',
    darkGrey: '#A9A9A9',

    // Donate Screen Specific Colors (from Figma)
    brownRose: '#B8846F',
    sliderTrack: 'rgba(255, 255, 255, 0.4)',
    sliderThumb: '#A0715C',
    introduzcaBackground: '#DCCEC9',
    introduzcaText: '#5D4037',
};

// FONTS, SIZES, SHADOWS remain the same as you provided.
export const FONTS = {
    regular: 'Poppins_400Regular',
    medium: 'Poppins_500Medium',
    semiBold: 'Poppins_600SemiBold',
    bold: 'Poppins_700Bold',
};

export const SIZES = {
    base: 8,
    small: 12,
    font: 14,
    medium: 16,
    large: 18,
    extraLarge: 24,
    xxl: 32,
    xxxl: 48,
    h1: 30,
    h2: 24,
    h3: 20,
    h4: 18,
    h5: 16,
    body1: 16,
    body2: 14,
    body3: 12,
    body4: 12,
};

export const SHADOWS = {
    light: {
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 2, },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 2,
    },
    medium: {
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 4, },
        shadowOpacity: 0.15,
        shadowRadius: 4.65,
        elevation: 4,
    },
    dark: {
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 6, },
        shadowOpacity: 0.2,
        shadowRadius: 5.45,
        elevation: 6,
    },
};