import { Axios } from "axios";
import { TUserProfileFormZS } from "@/@types/profile";
import { API_BASE_URL } from "@/services";

export const updateUserProfileRequest = (payload: Omit<TUserProfileFormZS, "email" | "isEditable">) => (axiosInstance: Axios) => axiosInstance.post(`${API_BASE_URL}/profile/update`, payload);