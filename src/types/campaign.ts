// types/campaign.ts
export interface BackendCampaign {
    id: number; // Changed from string to number
    title: string;
    description: string;
    category: string;
    goal: number;
    raised: number;
    progress: number;
    participants: number;
    imageUrl: string;
    status: string;
    verified: boolean;
    createdAt: string;
    updatedAt: string;
    organization: {
        id: number; // Changed from string to number
        name: string;
        // Add other organization fields as needed
    };
}

// Updated Campaign interface for frontend use
export interface Campaign {
    id: string; // Keep as string for consistency in frontend
    title: string;
    image: any; // This will be handled differently for remote images
    participants: number;
    progress: number;
    category: 'food' | 'water' | 'education' | 'other';
    goal: number;
    raised: number;
    description: string;
    organizationName: string;
    imageUrl?: string; // Add this for backend images
}

// Utility function to transform backend campaign to frontend campaign
export const transformCampaign = (backendCampaign: BackendCampaign): Campaign => {
    return {
        id: backendCampaign.id.toString(), // Convert number to string
        title: backendCampaign.title,
        image: backendCampaign.imageUrl ? { uri: backendCampaign.imageUrl } : require('../assets/campaign-palestine.png'), // Fallback image
        participants: backendCampaign.participants,
        progress: backendCampaign.progress,
        category: mapCategory(backendCampaign.category),
        goal: backendCampaign.goal,
        raised: backendCampaign.raised,
        description: backendCampaign.description,
        organizationName: backendCampaign.organization?.name || 'Unknown Organization',
        imageUrl: backendCampaign.imageUrl,
    };
};

// Helper function to map backend categories to frontend categories
const mapCategory = (backendCategory: string): 'food' | 'water' | 'education' | 'other' => {
    const categoryMap: { [key: string]: 'food' | 'water' | 'education' | 'other' } = {
        'food': 'food',
        'water': 'water',
        'education': 'education',
        'other': 'other',
    };

    return categoryMap[backendCategory.toLowerCase()] || 'other';
};