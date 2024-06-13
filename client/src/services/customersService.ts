import { Axios } from "axios";
import { API_BASE_URL, queryKeys } from "@/services";
import { TCustomerZS } from "@/@types/zodSchema/customerZS";
import { TListParams, TPaginatedResponse } from "@/@types/common";
import { useMutation, useQuery } from "@tanstack/react-query";
import { callApi } from "@/utils/apiUtils/callApi";
import { queryClient } from "@/App";

export const createCustomerRequest = (payload: Omit<TCustomerZS, "_id" | "userId">) => (axiosInstance: Axios) => axiosInstance.post(`${API_BASE_URL}/customer/create`, payload)

export const updateCustomerRequest = ({_id, ...payload}: Omit<TCustomerZS, "userId">) => (axiosInstance: Axios) => axiosInstance.put(`${API_BASE_URL}/customer/${_id}`, payload)

export const getCustomerDetailsRequest = ({_id}: Pick<TCustomerZS, "_id">) => (axiosInstance: Axios) => axiosInstance.get(`${API_BASE_URL}/customer?_id=${_id}`)

export const deleteCustomerRequest = ({_id}: Pick<TCustomerZS, "_id">) => (axiosInstance: Axios) => axiosInstance.put(`${API_BASE_URL}/customer/delete/${_id}`)

export const getCustomersListRequest = (payload: TListParams<Pick<TCustomerZS, "name" | "email"> | {}>) => (axiosInstance: Axios) => axiosInstance.post(`${API_BASE_URL}/customer/list`, payload)

export const useCreateCustomer = () => {
    return useMutation({
        mutationFn: async (payload: Omit<TCustomerZS, "_id" | "userId">) => {
            const result = await callApi({
                requestFunction: createCustomerRequest(payload),
            });
            return result as TCustomerZS;
        },
        onSuccess: (data) => {
            if ("error" in data && !data?.error) {
                queryClient.invalidateQueries({queryKey: [queryKeys.CUSTOMERS]})
                queryClient.invalidateQueries({queryKey: [queryKeys.DASHBOARD]})
            }
        }
    })
}

export const useUpdateCustomer = () => {
    return useMutation({
        mutationFn: async (payload: Omit<TCustomerZS, "userId">) => {
            const result = await callApi({
                requestFunction: updateCustomerRequest(payload),
            });
            return result as TCustomerZS;
        },
        onSuccess: (data) => {
            if ("error" in data && !data?.error) {
                queryClient.invalidateQueries({queryKey: [queryKeys.CUSTOMERS]})
                queryClient.invalidateQueries({queryKey: [queryKeys.DASHBOARD]})
            }
        }
    })
}

export const useGetCustomerDetails = (payload: Pick<TCustomerZS, "_id">) => {
    return useQuery({
        queryKey: [queryKeys.CUSTOMERS],
        queryFn: async () => {
            const result = await callApi({
                requestFunction: getCustomerDetailsRequest(payload),
                showToastOnSuccess: false,
            });
            return result as TCustomerZS;
        },
        refetchOnWindowFocus: false,
    })
}

export const useDeleteCustomer = () => {
    return useMutation({
        mutationFn: async (payload: Pick<TCustomerZS, "_id">) => {
            const result = await callApi({
                requestFunction: deleteCustomerRequest(payload),
            });
            return result as {};
        },
        onSuccess: (data) => {
            if ("error" in data && !data?.error) {
                queryClient.invalidateQueries({queryKey: [queryKeys.CUSTOMERS]})
                queryClient.invalidateQueries({queryKey: [queryKeys.DASHBOARD]})
            }
        }
    })
}

export const useGetCustomersList = ({search = "", page = 1, limit = 10, filter = {}}: TListParams<Pick<TCustomerZS, "name" | "email"> | {}>) => {
    return useQuery({
        queryKey: [queryKeys.CUSTOMERS, {search, page, limit, filter}],
        queryFn: async () => {
            const data = await callApi({
                requestFunction: getCustomersListRequest({search, page, limit, filter}),
                showToastOnSuccess: false,
            });
            return data as TPaginatedResponse<TCustomerZS>;
        },
        refetchOnWindowFocus: false,
    })
}