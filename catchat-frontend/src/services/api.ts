// Configuración base para llamadas API
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

interface RequestOptions extends RequestInit {
    headers?: Record<string, string>;
}

class ApiService {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    private async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
        const url = `${this.baseUrl}${endpoint}`;

        // Agregar token de autenticación si existe
        const token = localStorage.getItem('auth_token');
        const headers: Record<string, string> = {
            ...options.headers,
        };

        // Only add Content-Type: application/json if not present and body is not FormData
        if (!headers['Content-Type'] && !(options.body instanceof FormData)) {
            headers['Content-Type'] = 'application/json';
        }

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const config: RequestInit = {
            ...options,
            headers,
        };

        try {
            const response = await fetch(url, config);

            // Handle 204 No Content
            if (response.status === 204) {
                return {} as T;
            }

            const data = await response.json().catch(() => ({}));

            if (!response.ok) {
                // Throw an object that mimics axios error structure for compatibility
                const error: any = new Error(`HTTP error! status: ${response.status}`);
                error.response = {
                    status: response.status,
                    data: data
                };
                throw error;
            }

            return data;
        } catch (error) {
            console.error('API request failed:', error);
            throw error;
        }
    }

    async get<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
        return this.request<T>(endpoint, { ...options, method: 'GET' });
    }

    async post<T>(endpoint: string, data?: unknown, options: RequestOptions = {}): Promise<T> {
        const isFormData = data instanceof FormData;
        return this.request<T>(endpoint, {
            method: 'POST',
            body: isFormData ? data as BodyInit : JSON.stringify(data),
            ...options
        });
    }

    async put<T>(endpoint: string, data?: unknown, options: RequestOptions = {}): Promise<T> {
        const isFormData = data instanceof FormData;
        return this.request<T>(endpoint, {
            method: 'PUT',
            body: isFormData ? data as BodyInit : JSON.stringify(data),
            ...options
        });
    }

    async delete<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
        return this.request<T>(endpoint, { ...options, method: 'DELETE' });
    }
}

export const api = new ApiService(API_BASE_URL);
export default api;
