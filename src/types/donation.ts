export interface DonationRequest {
    amount: number;
    currency?: string;
    campaignId: number;
    paymentMethod?: string;
    anonymous?: boolean;
}

export interface DonationResponse {
    id: string;
    amount: number;
    currency: string;
    status: string;
    paymentMethod?: string;
    anonymous: boolean;
    createdAt: string;
    completedAt?: string;
    userId?: string;
    userName?: string;
    campaignId: number;
    campaignTitle: string;
}