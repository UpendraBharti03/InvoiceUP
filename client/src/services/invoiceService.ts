import { TInvoiceZS } from "@/@types/zodSchema/invoiceZS"
import { Axios } from "axios"
import { API_BASE_URL, queryKeys } from "@/services"
import { TListParams, TPaginatedResponse } from "@/@types/common"
import { useMutation, useQuery } from "@tanstack/react-query"
import { queryClient } from "@/App"
import { callApi } from "@/utils/apiUtils/callApi"

export const createInvoiceRequest = (payload: Omit<TInvoiceZS, "_id" | "userId">) => (axiosInstance: Axios) => axiosInstance.post(`${API_BASE_URL}/invoice/create`, payload)

export const updateInvoiceRequest = ({_id, ...payload}: Omit<TInvoiceZS, "userId">) => (axiosInstance: Axios) => axiosInstance.put(`${API_BASE_URL}/invoice/${_id}`, payload)

export const updateInvoiceStatusRequest = ({_id, ...payload}: Pick<TInvoiceZS, "_id" | "status">) => (axiosInstance: Axios) => axiosInstance.put(`${API_BASE_URL}/invoice/update-status/${_id}`, payload)

export const getInvoiceDetailsRequest = ({_id}: Pick<TInvoiceZS, "_id">) => (axiosInstance: Axios) => axiosInstance.get(`${API_BASE_URL}/invoice?_id=${_id}`)

export const deleteInvoiceRequest = ({_id}: Pick<TInvoiceZS, "_id">) => (axiosInstance: Axios) => axiosInstance.put(`${API_BASE_URL}/invoice/delete/${_id}`)

export const getInvoicesListRequest = (payload: TListParams<Pick<TInvoiceZS, "customer"> | {}>) => (axiosInstance: Axios) => axiosInstance.post(`${API_BASE_URL}/invoice/list`, payload)

export const useCreateInvoice = () => {
    return useMutation({
        mutationFn: async (payload: Omit<TInvoiceZS, "_id" | "userId">) => {
            const data = await callApi({
                requestFunction: createInvoiceRequest(payload),
            });
            return data as {result: TInvoiceZS; error?: boolean};
        },
        onSuccess: (data) => {
            if (!data?.error) {
                queryClient.invalidateQueries({queryKey: [queryKeys.INVOICES]})
                queryClient.invalidateQueries({queryKey: [queryKeys.DASHBOARD]})
            }
        }
    })
}

export const useUpdateInvoice = () => {
    return useMutation({
        mutationFn: async (payload: Omit<TInvoiceZS, "userId">) => {
            const result = await callApi({
                requestFunction: updateInvoiceRequest(payload),
            });
            return result as TInvoiceZS;
        },
        onSuccess: (data) => {
            if ("error" in data && !data?.error) {
                queryClient.invalidateQueries({queryKey: [queryKeys.INVOICES]})
                queryClient.invalidateQueries({queryKey: [queryKeys.DASHBOARD]})
            }
        }
    })
}

export const useUpdateInvoiceStatus = () => {
    return useMutation({
        mutationFn: async (payload: Pick<TInvoiceZS, "_id" | "status">) => {
            const result = await callApi({
                requestFunction: updateInvoiceStatusRequest(payload),
            });
            return result as TInvoiceZS;
        },
        onSuccess: (data) => {
            if ("error" in data && !data?.error) {
                queryClient.invalidateQueries({queryKey: [queryKeys.INVOICES]})
                queryClient.invalidateQueries({queryKey: [queryKeys.DASHBOARD]})
            }
        }
    })
}

export const useGetInvoiceDetails = (payload: Pick<TInvoiceZS, "_id">) => {
    return useQuery({
        queryKey: [queryKeys.INVOICES],
        queryFn: async () => {
            const data = await callApi({
                requestFunction: getInvoiceDetailsRequest(payload),
                showToastOnSuccess: false,
            });
            if ("error" in data && !data?.error) {
                return data?.result as TInvoiceZS;
            }
        },
        refetchOnWindowFocus: false,
    })
}

export const useDeleteInvoice = () => {
    return useMutation({
        mutationFn: async (payload: Pick<TInvoiceZS, "_id">) => {
            const result = await callApi({
                requestFunction: deleteInvoiceRequest(payload),
            });
            return result as {};
        },
        onSuccess: (data) => {
            if ("error" in data && !data?.error) {
                queryClient.invalidateQueries({queryKey: [queryKeys.INVOICES]})
                queryClient.invalidateQueries({queryKey: [queryKeys.DASHBOARD]})
            }
        }
    })
}

export const useGetInvoicesList = ({search = "", page = 1, limit = 10, filter = {}}: TListParams<Pick<TInvoiceZS, "customer"> | {}>) => {
    return useQuery({
        queryKey: [queryKeys.INVOICES, {search, page, limit, filter}],
        queryFn: async () => {
            const data = await callApi({
                requestFunction: getInvoicesListRequest({search, page, limit, filter}),
                showToastOnSuccess: false,
            });
            return data as TPaginatedResponse<TInvoiceZS>;
        },
        refetchOnWindowFocus: false,
    })
}