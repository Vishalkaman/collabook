import { useState, useCallback } from 'react';
import axios, { type AxiosRequestConfig, type AxiosResponse, type Method } from 'axios';

// ✅ Axios instance with common headers
const api = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        // Authorization: `Bearer ${token}`, // Optional: inject token dynamically
    },
    timeout: 10000,
});

// ✅ useApi hook
type UseApiReturn<T> = {
    data: T | null;
    loading: boolean;
    error: string | null;
    request: (
        url: string,
        method?: Method,
        data?: any,
        config?: AxiosRequestConfig
    ) => Promise<T | undefined>;
};

export function useApi<T = any>(): UseApiReturn<T> {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const request = useCallback(
        async (
            url: string,
            method: Method = 'get',
            data?: any,
            config: AxiosRequestConfig = {}
        ) => {
            setLoading(true);
            setError(null);
            setData(null);

            try {
                const response: AxiosResponse<T> = await api.request({
                    url,
                    method,
                    data,
                    ...config,
                });

                setData(response.data);
                return response.data;
            } catch (err: any) {
                const message = err.response?.data?.message || err.message;
                setError(message);
            } finally {
                setLoading(false);
            }
        },
        []
    );

    return { data, loading, error, request };
}
