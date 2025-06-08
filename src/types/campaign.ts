export interface BackendCampaign {
    id: number;
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
        id: number;
        name: string;
    };
}

export interface Campaign {
    id: string;
    title: string;
    image: any;
    participants: number;
    progress: number;
    category: 'food' | 'water' | 'education' | 'other';
    goal: number;
    raised: number;
    description: string;
    organizationName: string;
    imageUrl?: string;
}

export const transformCampaign = (backendCampaign: BackendCampaign): Campaign => {
    return {
        id: backendCampaign.id.toString(),
        title: backendCampaign.title,
        image: backendCampaign.imageUrl ? { uri: backendCampaign.imageUrl } : require('../assets/campaign-palestine.png'),
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

const mapCategory = (backendCategory: string): 'food' | 'water' | 'education' | 'other' => {
    const categoryMap: { [key: string]: 'food' | 'water' | 'education' | 'other' } = {
        'food': 'food',
        'water': 'water',
        'education': 'education',
        'other': 'other',
    };

    return categoryMap[backendCategory.toLowerCase()] || 'other';
};