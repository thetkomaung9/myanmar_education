import axios from 'axios';

/**
 * Axios base client for the EduSphere Myanmar REST API.
 * Base URL is configured via NEXT_PUBLIC_API_URL environment variable.
 */
export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30_000,
});

// Request interceptor — attach JWT access token if present
apiClient.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = document.cookie
      .split('; ')
      .find((row) => row.startsWith('access_token='))
      ?.split('=')[1];

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Response interceptor — normalize errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Surface a clean error message; callers can check error.response.status
    return Promise.reject(error);
  }
);
