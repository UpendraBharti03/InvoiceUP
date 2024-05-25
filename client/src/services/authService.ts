import axios, { Axios } from 'axios';
import { API_BASE_URL } from '@/services';
import { TAuthPayload } from '@/@types/auth';

export const signupRequest = (payload: TAuthPayload) => axios.post(`${API_BASE_URL}/auth/signup`, payload);

export const loginRequest = async (payload: Pick<TAuthPayload, "email" | "password">) => axios.post(`${API_BASE_URL}/auth/login`, payload);

export const getProfileRequest = () => (axiosInstance: Axios) => axiosInstance.get(`${API_BASE_URL}/auth/get-profile`);