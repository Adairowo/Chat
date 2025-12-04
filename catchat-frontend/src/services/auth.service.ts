import api from './api';

interface LoginCredentials {
    email: string;
    password: string;
}

interface RegisterData {
    name: string;
    email: string;
    password: string;
    password_confirmation?: string;
}

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    avatar?: string;
    descripcion?: string;
}

interface LoginResponse {
    access_token: string;
    token_type: string;
    expires_in: number;
    user: User;
}

interface RegisterResponse {
    message: string;
    user: User;
}

export const authService = {
    async login(credentials: LoginCredentials): Promise<LoginResponse> {
        const response = await api.post<LoginResponse>('/auth/login', credentials);

        // Guardar token en localStorage
        if (response.access_token) {
            localStorage.setItem('auth_token', response.access_token);
            // Also store user info if needed, or fetch it separately
            localStorage.setItem('user', JSON.stringify(response.user));
        }

        return response;
    },

    async register(data: RegisterData): Promise<RegisterResponse> {
        const response = await api.post<RegisterResponse>('/auth/register', data);
        return response;
    },

    async updateProfile(data: FormData): Promise<{ message: string, user: User }> {
        const response = await api.post<{ message: string, user: User }>('/auth/profile', data);
        return response;
    },

    async logout(): Promise<void> {
        try {
            await api.post('/auth/logout');
        } finally {
            // Limpiar token independientemente del resultado
            localStorage.removeItem('auth_token');
            localStorage.removeItem('user');
        }
    },

    async getCurrentUser(): Promise<User> {
        return await api.get<User>('/auth/me');
    },

    getToken(): string | null {
        return localStorage.getItem('auth_token');
    },

    isAuthenticated(): boolean {
        return !!this.getToken();
    },
};

export default authService;
