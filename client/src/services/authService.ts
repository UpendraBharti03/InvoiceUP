import { Axios } from 'axios';
import { API_BASE_URL } from '@/services';

export const signupRequest = (payload: { firstName: string; lastName: string; email: string; password: string }) => (axiosInstance: Axios) => axiosInstance.post(`${API_BASE_URL}/auth/signup`, payload);