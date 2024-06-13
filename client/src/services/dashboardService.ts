import { Axios } from "axios";
import { API_BASE_URL, queryKeys } from "@/services";
import { useQuery } from "@tanstack/react-query";
import { callApi } from "@/utils/apiUtils/callApi";
import { TDashboardAnalyticsDataResultZS } from "@/@types/dashboard";

export const getDashboardAnalyticsDataRequest = () => (axiosInstance: Axios) => axiosInstance.get(`${API_BASE_URL}/dashboard/`);


export const useGetDashboardAnalyticsData = () => {
    return useQuery({
        queryKey: [queryKeys.DASHBOARD],
        queryFn: async () => {
            const data = await callApi({
                requestFunction: getDashboardAnalyticsDataRequest(),
            });
            if ("error" in data && !data?.error) {
                return data?.result as TDashboardAnalyticsDataResultZS;
            }
        },
        refetchOnWindowFocus: false,
    })
}
