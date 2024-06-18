import { API_BASE_URL } from "@/services";
import { store as defaultStore } from "@/redux/store";
import axios from "axios";
import { extractDataFromResponse, parseApiErrorResponse } from "@/utils/apiUtils/parser";
import { toast } from "react-toastify";

export type TCallApiParams = {
  requestFunction: (args: any) => any;
  successCode?: number;
  showToastOnSuccess?: boolean;
  showToastOnError?: boolean;
  authErrorCode?: number;
  callAccessTokenOnAuthError?: boolean;
  thunkApi?: any;
};

export const accessTokenRequest = async ({
  accessToken,
}: {
  accessToken: string;
}) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/access-token`, {
      accessToken,
    });
    return extractDataFromResponse({
      response,
      showErrorToast: false,
      showSuccessToast: false,
    });
  } catch (error) {
    return parseApiErrorResponse({
      error,
      showToast: false,
    });
  }
};

export const callApi = async ({
  requestFunction,
  successCode = 200,
  showToastOnSuccess = true,
  showToastOnError = true,
  authErrorCode = 401,
  callAccessTokenOnAuthError = true,
  thunkApi,
}: TCallApiParams) => {
  const store = thunkApi ? thunkApi : defaultStore;
  const accessToken = store.getState().auth.accessToken;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  };
  const axiosInstance = axios.create({
    headers,
  });
  if (requestFunction) {
    try {
      const response = await requestFunction(axiosInstance);
      return extractDataFromResponse({
        response,
        successCode,
        showSuccessToast: showToastOnSuccess,
        showErrorToast: showToastOnError,
      });
    } catch (error: any) {
      console.log("callApi -> error", error);

      if (error.response) {
        if (
          error.response.status === authErrorCode ||
          error.response.data.code === authErrorCode
        ) {
          if (callAccessTokenOnAuthError) {
            const accessToken = store.getState().auth.accessToken;
            if (!accessToken) {
              return { error: true };
            }
            const accessTokenResponseData = await accessTokenRequest({
              accessToken,
            });
            if (accessTokenResponseData.error) {
              toast.error("Your session expired, please login again.");
              store.dispatch({
                type: "auth/logout/fulfilled",
                payload: {},
              });
              return { error: true };
            }
            const newAccessToken =
              accessTokenResponseData?.tokens?.access?.token;
            if (newAccessToken) {
              store.dispatch({
                type: "auth/setTokens",
                payload: {
                  accessToken: newAccessToken,
                },
              });
              return callApi({
                requestFunction,
                successCode,
                showToastOnSuccess,
                showToastOnError,
                callAccessTokenOnAuthError: false,
              });
            }
            return { error: true };
          }
          return { error: true };
        }

        return parseApiErrorResponse({
          error,
          showToast: showToastOnError,
        });
      }
    }
  }
  return { error: true };
};
