import { API_BASE_URL } from "@/services";
import { store as defaultStore } from '@/redux/store';

export type TCallApiParams = {
    requestFunction: (args: any) => any,
    successCode?: number,
    showToastOnSuccess?: boolean,
    showToastOnError?: boolean,
    authErrorCode?: number;
    thunkApi?: any;
}

export const callApi = async ({ requestFunction, successCode, showToastOnSuccess, showToastOnError, authErrorCode, thunkApi }: TCallApiParams) => {
    const store = thunkApi ? thunkApi : defaultStore;
    const accessToken = store.getState().auth.accessToken;
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
    };
    const axiosInstance = axios.create({
        headers
    });
    if (requestFunction) {
        try {
            const response = await requestFunction(axiosInstance);
            return extractDataFromResponse({
                response,
                successCode,
                showSuccessToast: showToastOnSuccess,
                showErrorToast: showToastOnError
            });
        } catch (error: any) {
            console.log("callApi -> error", error);

            if (error.response) {
                if (error.response.status === authErrorCode || error.response.data.code === authErrorCode) {
                    if (callRefreshTokenOnAuthError) {
                        const refreshToken = store.getState().auth.refreshToken;
                        if (!refreshToken) {
                            return { error: true };
                        }
                        const refreshTokenResponseData = await refreshTokenRequest({
                            refreshToken,
                            API_BASE_URL
                        });
                        if (refreshTokenResponseData.error) {
                            toast.error("Your session expired, please login again.")
                            store.dispatch({
                                type: 'auth/logout/fulfilled',
                                payload: {}
                            })
                            return { error: true };
                        }
                        const newAccessToken = refreshTokenResponseData?.tokens?.access?.token;
                        const newRefreshToken = refreshTokenResponseData?.tokens?.refresh?.token;
                        if (newAccessToken && newRefreshToken) {
                            store.dispatch({
                                type: "auth/setTokens",
                                payload: {
                                    accessToken: newAccessToken,
                                    refreshToken: newRefreshToken
                                }
                            });
                            return generateCallApi({ store, API_BASE_URL })({
                                requestFunction,
                                successCode,
                                showToastOnSuccess,
                                showToastOnError,
                                callRefreshTokenOnAuthError: false
                            });
                        }
                        return { error: true };
                    }
                    return { error: true };
                }

                return parseApiErrorResponse({
                    error,
                    showToast: showToastOnError
                });
            }
        }
    }
    return { error: true };
}