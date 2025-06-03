import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import { COLORS, FONTS, SIZES, SHADOWS } from '../../utils/constants';
import { campaignsData } from '../../utils/campaignsData';
import CampaignCardHome from './CampaignCardHome';

interface Category {
    id: string;
    name: string;
    icon: 'food' | 'water' | 'education' | 'other';
}

interface CategoriesSectionProps {
    categories: Category[];
    selectedCategory: string | null;
    onSelectCategory: (category: Category) => void;
    onCampaignPress: (campaignId: string) => void;
}

const CategoriesSection: React.FC<CategoriesSectionProps> = ({
                                                                 categories,
                                                                 selectedCategory,
                                                                 onSelectCategory,
                                                                 onCampaignPress,
                                                             }) => {
    // Get icon based on a category type
    const getCategoryIcon = (icon: string) => {
        switch (icon) {
            case 'food':
                return require('../../assets/food-icon.png');
            case 'water':
                return require('../../assets/water-icon.png');
            case 'education':
                return require('../../assets/education-icon.png');
            case 'other':
            default:
                return require('../../assets/other-icon.png');
        }
    };

    // Get color based on a category type
    const getCategoryColor = (icon: string): string => {
        switch (icon) {
            case 'food':
                return '#ded2d3';
            case 'water':
                return '#E6F7FF';
            case 'education':
                return '#FFF2E6';
            case 'other':
            default:
                return '#E6F9F7';
        }
    };

    const getIconColor = (icon: string): string => {
        switch (icon) {
            case 'food':
                return '#8C6E63';
            case 'water':
                return '#3498DB';
            case 'education':
                return '#F39C12';
            case 'other':
            default:
                return COLORS.primary;
        }
    };

    // Map category names to filter values
    const getCategoryFilterValue = (categoryName: string): string => {
        switch (categoryName.toLowerCase()) {
            case 'comida':
                return 'food';
            case 'agua':
                return 'water';
            case 'educacion':
                return 'education';
            case 'otros':
                return 'other';
            default:
                return 'other';
        }
    };

    // Filter campaigns based on a selected category
    const getFilteredCampaigns = () => {
        if (!selectedCategory) return [];

        const selectedCategoryData = categories.find(cat => cat.id === selectedCategory);
        if (!selectedCategoryData) return [];

        const filterValue = getCategoryFilterValue(selectedCategoryData.name);
        return campaignsData.filter(campaign => campaign.category === filterValue);
    };

    const filteredCampaigns = getFilteredCampaigns();

    // No campaigns found component
    const NoCampaignsCard = () => (
        <View style={styles.noCampaignsContainer}>
            <View style={styles.noCampaignsCard}>
                <View style={styles.noCampaignsIconContainer}>
                    <Text style={styles.noCampaignsIcon}>🔍</Text>
                </View>
                <Text style={styles.noCampaignsTitle}>No hay campañas disponibles</Text>
                <Text style={styles.noCampaignsSubtitle}>
                    No encontramos campañas en esta categoría en este momento.
                </Text>
                <TouchableOpacity
                    style={styles.noCampaignsButton}
                    onPress={() => onSelectCategory({ id: '', name: '', icon: 'other' })} // Reset selection
                >
                    <Text style={styles.noCampaignsButtonText}>Ver todas las categorías</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.sectionTitle}>Categorías</Text>

            <View style={styles.categoriesRow}>
                {categories.map((category) => (
                    <TouchableOpacity
                        key={category.id}
                        style={[
                            styles.categoryItem,
                            { backgroundColor: getCategoryColor(category.icon) },
                            selectedCategory === category.id && styles.selectedCategoryItem
                        ]}
                        onPress={() => onSelectCategory(category)}
                    >
                        <View
                            style={[
                                styles.iconContainer,
                                { backgroundColor: getCategoryColor(category.icon) },
                                selectedCategory === category.id && styles.selectedIconContainer
                            ]}
                        >
                            <Image
                                source={getCategoryIcon(category.icon)}
                                style={[
                                    styles.iconImage,
                                    { tintColor: getIconColor(category.icon) },
                                    selectedCategory === category.id && styles.selectedIconImage
                                ]}
                            />
                        </View>
                        <Text style={[
                            styles.categoryName,
                            selectedCategory === category.id && styles.selectedCategoryName
                        ]}>
                            {category.name}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Show filtered campaigns when a category is selected */}
            {selectedCategory && (
                <View style={styles.filteredCampaignsContainer}>
                    <View style={styles.filteredHeader}>
                        <Text style={styles.filteredTitle}>
                            Campañas de {categories.find(cat => cat.id === selectedCategory)?.name}
                        </Text>
                        <TouchableOpacity
                            onPress={() => onSelectCategory({ id: '', name: '', icon: 'other' })}
                            style={styles.clearFilterButton}
                        >
                            <Text style={styles.clearFilterText}>Limpiar filtro</Text>
                        </TouchableOpacity>
                    </View>

                    {filteredCampaigns.length > 0 ? (
                        <View>
                            {filteredCampaigns.map((item) => (
                                <CampaignCardHome
                                    key={item.id}
                                    id={item.id}
                                    title={item.title}
                                    image={item.image}
                                    participants={item.participants}
                                    onPress={() => onCampaignPress(item.id)}
                                />
                            ))}
                        </View>
                    ) : (
                        <NoCampaignsCard />
                    )}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: SIZES.medium,
        paddingHorizontal: SIZES.large,
    },
    sectionTitle: {
        fontFamily: FONTS.semiBold,
        fontSize: SIZES.large,
        color: COLORS.black,
        marginBottom: SIZES.small,
    },
    categoriesRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: SIZES.small,
    },
    categoryItem: {
        width: '22%',
        aspectRatio: 0.9,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: SIZES.base,
        ...SHADOWS.light,
    },
    selectedCategoryItem: {
        transform: [{ scale: 1.05 }],
        ...SHADOWS.medium,
    },
    iconContainer: {
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: SIZES.base,
    },
    selectedIconContainer: {
        ...SHADOWS.light,
    },
    iconImage: {
        width: 20,
        height: 20,
    },
    selectedIconImage: {
        width: 22,
        height: 22,
    },
    categoryName: {
        fontFamily: FONTS.regular,
        fontSize: SIZES.small,
        color: COLORS.grey,
        textAlign: 'center',
    },
    selectedCategoryName: {
        fontFamily: FONTS.semiBold,
        color: COLORS.black,
    },
    filteredCampaignsContainer: {
        marginTop: SIZES.large,
    },
    filteredHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SIZES.medium,
    },
    filteredTitle: {
        fontFamily: FONTS.semiBold,
        fontSize: SIZES.medium,
        color: COLORS.black,
    },
    clearFilterButton: {
        paddingHorizontal: SIZES.small,
        paddingVertical: SIZES.base,
    },
    clearFilterText: {
        fontFamily: FONTS.regular,
        fontSize: SIZES.small,
        color: COLORS.primary,
    },
    noCampaignsContainer: {
        marginTop: SIZES.medium,
        paddingHorizontal: SIZES.small,
    },
    noCampaignsCard: {
        backgroundColor: COLORS.white,
        borderRadius: SIZES.medium,
        padding: SIZES.extraLarge,
        alignItems: 'center',
        ...SHADOWS.medium,
    },
    noCampaignsIconContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#F8F9FA',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: SIZES.medium,
    },
    noCampaignsIcon: {
        fontSize: 40,
    },
    noCampaignsTitle: {
        fontFamily: FONTS.semiBold,
        fontSize: SIZES.medium,
        color: COLORS.black,
        textAlign: 'center',
        marginBottom: SIZES.small,
    },
    noCampaignsSubtitle: {
        fontFamily: FONTS.regular,
        fontSize: SIZES.small,
        color: COLORS.grey,
        textAlign: 'center',
        marginBottom: SIZES.large,
        lineHeight: 20,
    },
    noCampaignsButton: {
        backgroundColor: COLORS.primary,
        paddingHorizontal: SIZES.large,
        paddingVertical: SIZES.medium,
        borderRadius: SIZES.base,
    },
    noCampaignsButtonText: {
        fontFamily: FONTS.semiBold,
        fontSize: SIZES.small,
        color: COLORS.white,
    },
});

export default CategoriesSection;