import axios, { Axios } from 'axios';
import { API_BASE_URL } from '@/services';
import { TAuthPayload } from '@/@types/auth';

export const signupRequest = async (payload: TAuthPayload) => axios.post(`${API_BASE_URL}/auth/signup`, payload);

export const loginRequest = async (payload: Pick<TAuthPayload, "email" | "password">) => axios.post(`${API_BASE_URL}/auth/login`, payload);

export const logoutRequest = ({ token }: { token: string }) => (axiosInstance: Axios) => axiosInstance.post(`${API_BASE_URL}/auth/logout`, { token });

export const getProfileRequest = () => (axiosInstance: Axios) => axiosInstance.get(`${API_BASE_URL}/auth/get-profile`);