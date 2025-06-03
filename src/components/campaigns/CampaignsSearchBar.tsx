import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { COLORS, FONTS, SIZES, SHADOWS } from '../../utils/constants';

// Search Icon Component
const SearchIcon = () => (
    <View style={styles.searchIconContainer}>
        <View style={styles.searchIcon}>
            <View style={styles.searchCircle} />
            <View style={styles.searchHandle} />
        </View>
    </View>
);

interface SearchBarProps {
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
}

const CampaignsSearchBar = ({ value, onChangeText, placeholder = "Buscar" }: SearchBarProps) => {
    return (
        <View style={styles.container}>
            <View style={styles.searchBar}>
                <SearchIcon />
                <TextInput
                    style={styles.searchInput}
                    placeholder={placeholder}
                    placeholderTextColor={COLORS.grey}
                    value={value}
                    onChangeText={onChangeText}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: SIZES.large,
        marginBottom: SIZES.medium,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        borderRadius: 25,
        paddingHorizontal: SIZES.medium,
        paddingVertical: SIZES.small,
        ...SHADOWS.light,
        borderWidth: 1,
        borderColor: COLORS.lightGrey,
    },
    searchIconContainer: {
        marginRight: SIZES.base,
    },
    searchIcon: {
        width: 16,
        height: 16,
        position: 'relative',
    },
    searchCircle: {
        width: 12,
        height: 12,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: COLORS.grey,
        position: 'absolute',
        top: 0,
        left: 0,
    },
    searchHandle: {
        width: 6,
        height: 2,
        backgroundColor: COLORS.grey,
        position: 'absolute',
        bottom: 0,
        right: 0,
        transform: [{ rotate: '45deg' }],
    },
    searchInput: {
        flex: 1,
        fontSize: SIZES.font,
        fontFamily: FONTS.regular,
        color: COLORS.black,
        paddingVertical: SIZES.base,
    },
});

export default CampaignsSearchBar;