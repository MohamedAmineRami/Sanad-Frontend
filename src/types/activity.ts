export interface Activity {
    id: string;
    type: string;
    message: string;
    createdAt: string;
    isPublic: boolean;
    user?: {
        id: string;
        name: string;
    };
    campaign?: {
        id: number;
        title: string;
    };
}

export interface ActivityItem {
    id: string;
    type: 'donation' | 'campaign';
    message: string;
    icon: 'user' | 'group';
}

export const transformActivity = (activity: Activity): ActivityItem => {
    return {
        id: activity.id,
        type: activity.type === 'donation' ? 'donation' : 'campaign',
        message: activity.message,
        icon: activity.type === 'donation' ? 'user' : 'group',
    };
};