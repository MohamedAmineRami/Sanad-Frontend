import {
    AuthResponse,
    LoginRequest,
    RegisterRequest,
} from '../types/auth-types';
import { BackendCampaign } from '../types/campaign';
import { DonationRequest, DonationResponse } from '../types/donation';
import { Activity } from '../types/activity';

const BASE_URL = 'http://192.168.1.129:8080/api'; // Adjust this to your backend URL

class ApiService {
    private static instance: ApiService;
    private token: string | null = null;

    private constructor() {}

    static getInstance(): ApiService {
        if (!ApiService.instance) {
            ApiService.instance = new ApiService();
        }
        return ApiService.instance;
    }

    setToken(token: string | null) {
        this.token = token;
    }

    private async request<T>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<T> {
        const url = `${BASE_URL}${endpoint}`;

        const defaultHeaders: Record<string, string> = {
            'Content-Type': 'application/json',
        };

        if (this.token) {
            defaultHeaders.Authorization = `Bearer ${this.token}`;
        }

        const config: RequestInit = {
            ...options,
            headers: {
                ...defaultHeaders,
                ...options.headers,
            },
        };

        try {
            const response = await fetch(url, config);

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || `HTTP ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('API Request failed:', error);
            throw error;
        }
    }

    // Authentication endpoints
    async login(credentials: LoginRequest): Promise<AuthResponse> {
        return this.request<AuthResponse>('/auth/login', {
            method: 'POST',
            body: JSON.stringify(credentials),
        });
    }

    async register(userData: RegisterRequest): Promise<AuthResponse> {
        return this.request<AuthResponse>('/auth/register', {
            method: 'POST',
            body: JSON.stringify(userData),
        });
    }

    async logout(): Promise<void> {
        const url = `${BASE_URL}/auth/logout`;

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || `HTTP ${response.status}`);
        }
    }

    // Campaign endpoints
    async getCampaigns(): Promise<BackendCampaign[]> {
        return this.request<BackendCampaign[]>('/campaigns');
    }

    async getCampaignById(id: number): Promise<BackendCampaign> {
        return this.request<BackendCampaign>(`/campaigns/${id}`);
    }

    // New method to get campaigns by category
    async getCampaignsByCategory(category: string): Promise<BackendCampaign[]> {
        return this.request<BackendCampaign[]>(`/campaigns?category=${category}`);
    }

    // Donation endpoints
    async createDonation(donationData: DonationRequest): Promise<DonationResponse> {
        return this.request<DonationResponse>('/donations', {
            method: 'POST',
            body: JSON.stringify(donationData),
        });
    }

    // Activity endpoints
    async getPublicActivities(): Promise<Activity[]> {
        return this.request<Activity[]>('/activities/public');
    }

    async getRecentActivities(limit: number = 2): Promise<Activity[]> {
        return this.request<Activity[]>(`/activities/recent?limit=${limit}`);
    }
}

export default ApiService.getInstance();