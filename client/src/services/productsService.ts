import { Axios } from "axios";
import { API_BASE_URL, queryKeys } from "@/services";
import { TProductZS } from "@/@types/zodSchema/productZS";
import { TListParams, TPaginatedResponse } from "@/@types/common";
import { useMutation, useQuery } from "@tanstack/react-query";
import { callApi } from "@/utils/apiUtils/callApi";
import { queryClient } from "@/App";

export const createProductRequest = (payload: Omit<TProductZS, "_id" | "userId">) => (axiosInstance: Axios) => axiosInstance.post(`${API_BASE_URL}/product/create`, payload)

export const updateProductRequest = ({_id, ...payload}: Omit<TProductZS, "userId">) => (axiosInstance: Axios) => axiosInstance.put(`${API_BASE_URL}/product/${_id}`, payload)

export const getProductDetailsRequest = ({_id}: Pick<TProductZS, "_id">) => (axiosInstance: Axios) => axiosInstance.get(`${API_BASE_URL}/product?_id=${_id}`)

export const deleteProductRequest = ({_id}: Pick<TProductZS, "_id">) => (axiosInstance: Axios) => axiosInstance.put(`${API_BASE_URL}/product/delete/${_id}`)

export const getProductsListRequest = (payload: TListParams<Pick<TProductZS, "productName" | "productDescription"> | {}>) => (axiosInstance: Axios) => axiosInstance.post(`${API_BASE_URL}/product/list`, payload)

export const useCreateProduct = () => {
    return useMutation({
        mutationFn: async (payload: Omit<TProductZS, "_id" | "userId">) => {
            const result = await callApi({
                requestFunction: createProductRequest(payload),
            });
            return result as TProductZS;
        },
        onSuccess: (data) => {
            if ("error" in data && !data?.error) {
                queryClient.invalidateQueries({queryKey: [queryKeys.PRODUCTS]})
                queryClient.invalidateQueries({queryKey: [queryKeys.DASHBOARD]})
            }
        }
    })
}

export const useUpdateProduct = () => {
    return useMutation({
        mutationFn: async (payload: Omit<TProductZS, "userId">) => {
            const result = await callApi({
                requestFunction: updateProductRequest(payload),
            });
            return result as TProductZS;
        },
        onSuccess: (data) => {
            if ("error" in data && !data?.error) {
                queryClient.invalidateQueries({queryKey: [queryKeys.PRODUCTS]})
                queryClient.invalidateQueries({queryKey: [queryKeys.DASHBOARD]})
            }
        }
    })
}

export const useGetProductDetails = (payload: Pick<TProductZS, "_id">) => {
    return useQuery({
        queryKey: [queryKeys.PRODUCTS],
        queryFn: async () => {
            const result = await callApi({
                requestFunction: getProductDetailsRequest(payload),
                showToastOnSuccess: false,
            });
            return result as TProductZS;
        },
        refetchOnWindowFocus: false,
    })
}

export const useDeleteProduct = () => {
    return useMutation({
        mutationFn: async (payload: Pick<TProductZS, "_id">) => {
            const result = await callApi({
                requestFunction: deleteProductRequest(payload),
            });
            return result as {};
        },
        onSuccess: (data) => {
            if ("error" in data && !data?.error) {
                queryClient.invalidateQueries({queryKey: [queryKeys.PRODUCTS]})
                queryClient.invalidateQueries({queryKey: [queryKeys.DASHBOARD]})
            }
        }
    })
}

export const useGetProductsList = ({search = "", page = 1, limit = 10, filter = {}}: TListParams<Pick<TProductZS, "productName" | "productDescription"> | {}>) => {
    return useQuery({
        queryKey: [queryKeys.PRODUCTS, {search, page, limit, filter}],
        queryFn: async () => {
            const data = await callApi({
                requestFunction: getProductsListRequest({search, page, limit, filter}),
                showToastOnSuccess: false,
            });
            return data as TPaginatedResponse<TProductZS>;
        },
        refetchOnWindowFocus: false,
    })
}