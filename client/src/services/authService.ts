import { Axios } from 'axios';
import { API_BASE_URL } from '@/services';
import { TAuthPayload } from '@/@types/auth';

export const signupRequest = (payload: TAuthPayload) => (axiosInstance: Axios) => axiosInstance.post(`${API_BASE_URL}/auth/signup`, payload);

export const loginRequest = (payload: Pick<TAuthPayload, "email" | "password">) => (axiosInstance: Axios) => axiosInstance.post(`${API_BASE_URL}/auth/login`, payload);