const BASE_URL = process.env.EXPO_PUBLIC_API_URL || "http://localhost:8000/api";

export interface ApiResponse<T> {
    data?: T;
    error?: string;
    status: number;
}

export async function apiClient<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<ApiResponse<T>> {
    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                ...(options.headers || {}),
            },
            ...options,
        });

        const data = await response.json();
        return { data, status: response.status };
    } catch (err: any) {
        return {
            error: err?.message || "Network connection error",
            status: 500,
        };
    }
}