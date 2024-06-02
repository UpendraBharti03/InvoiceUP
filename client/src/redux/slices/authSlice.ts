import { TAuthPayload, TAuthSliceState, TProfile } from '@/@types/auth';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '@/redux/store';
import { callApi } from '@/utils/apiUtils/callApi';
import { getProfileRequest, loginRequest, logoutRequest, signupRequest } from '@/services/authService';
import { extractDataFromResponse, parseApiErrorResponse } from '@/utils/apiUtils/parser';
import { updateUserProfileRequest } from '@/services/userProfileService';
import { TUserProfileFormZS } from '@/@types/profile';

const initialState: TAuthSliceState = {
    isAuthenticated: false,
    isAuthLoading: false,
    accessToken: '',
    user: null,
}

export const AUTH_SLICE_NAME = "auth";

export const signupUser = createAsyncThunk(`${AUTH_SLICE_NAME}/signup`, async (payload: TAuthPayload, thunkAPI) => {
  try {
    const response = await signupRequest(payload);
    return extractDataFromResponse({ response }) as TProfile;
  } catch (error) {
    return thunkAPI.rejectWithValue(parseApiErrorResponse({ error, showToast: true }));
  }
})

export const loginUser = createAsyncThunk(`${AUTH_SLICE_NAME}/login`, async (payload: Pick<TAuthPayload, "email" | "password">, thunkAPI) => {
  try {
    const response = await loginRequest(payload);
    return extractDataFromResponse({ response }) as TProfile;
  } catch (error) {
    return thunkAPI.rejectWithValue(parseApiErrorResponse({ error, showToast: true }));
  }
});

export const logoutUser = createAsyncThunk(`${AUTH_SLICE_NAME}/logout`, async (_, thunkAPI) => {
  // @ts-ignore
  const accessToken = thunkAPI.getState()[AUTH_SLICE_NAME].accessToken;
  const response = await callApi({
      requestFunction: logoutRequest({ token: accessToken }),
      showToastOnSuccess: false,
      showToastOnError: false,
      thunkApi: thunkAPI,
  });
  if (response?.error) {
      return thunkAPI.rejectWithValue(response);
  }
  return response;
});

export const getUserProfile = createAsyncThunk(`${AUTH_SLICE_NAME}/getProfile`, async (_, thunkAPI) => {
  const result = await callApi({
    requestFunction: getProfileRequest(),
    thunkApi: thunkAPI,
  });
  if (result?.error) {
    return thunkAPI.rejectWithValue(result);
  }
  return result as Pick<TProfile, "user">;
})

export const updateUserProfile = createAsyncThunk(`${AUTH_SLICE_NAME}/updateProfile`, async (payload: Omit<TUserProfileFormZS, "email" | "isEditable">, thunkAPI) => {
  const result = await callApi({
    requestFunction: updateUserProfileRequest(payload),
    thunkApi: thunkAPI,
  });
  if (result?.error) {
    return thunkAPI.rejectWithValue(result);
  }
  return result as Pick<TProfile, "user">;
})

export const authSlice = createSlice({
  name: AUTH_SLICE_NAME,
  initialState,
  reducers: {
    setTokens: (state, action) => {
      const { accessToken } = action?.payload ?? {};
      state.accessToken = accessToken;
    },
  },
  extraReducers: (builders) => {
    builders.addCase(signupUser.pending, (state) => {
      state.isAuthLoading = true;
    });
    builders.addCase(signupUser.fulfilled, (state, { payload }) => {
      const accessToken = payload?.tokens?.access?.token ?? "";
      state.accessToken = accessToken;
      state.isAuthenticated = true;
      state.isAuthLoading = false;
      state.user = payload?.user ?? {};
    });
    builders.addCase(signupUser.rejected, (state) => {
      state.isAuthLoading = false;
    });

    builders.addCase(loginUser.pending, (state) => {
      state.isAuthLoading = true;
    });
    builders.addCase(loginUser.fulfilled, (state, { payload }) => {
      const accessToken = payload?.tokens?.access?.token ?? "";
      state.accessToken = accessToken;
      state.isAuthenticated = true;
      state.isAuthLoading = false;
      state.user = payload?.user ?? {};
    });
    builders.addCase(loginUser.rejected, (state) => {
      state.isAuthLoading = false;
    });
    builders.addCase(logoutUser.pending, (state) => {
      state.isAuthLoading = true;
    });
    builders.addCase(logoutUser.fulfilled, (state) => {
      state.isAuthLoading = false;
      state.isAuthenticated = false;
      state.accessToken = "";
      state.user = null;
    });
    builders.addCase(logoutUser.rejected, (state) => {
      state.isAuthLoading = false;
      state.isAuthenticated = false;
      state.accessToken = "";
      state.user = null;
    });
    builders.addCase(getUserProfile.pending, (state) => {
      state.isAuthLoading = true;
    });
    builders.addCase(getUserProfile.fulfilled, (state, { payload }) => {
      state.isAuthLoading = false;
      state.user = payload.user;
    });
    builders.addCase(getUserProfile.rejected, (state) => {
      state.isAuthLoading = false;
    });
    builders.addCase(updateUserProfile.pending, (state) => {
      state.isAuthLoading = true;
    });
    builders.addCase(updateUserProfile.fulfilled, (state, { payload }) => {
      state.isAuthLoading = false;
      state.user = payload.user;
    });
    builders.addCase(updateUserProfile.rejected, (state) => {
      state.isAuthLoading = false;
    });
  },
});

// Action creators are generated for each case reducer function
// @ts-ignore - TODO: type check
export const { setToken } = authSlice.actions

export const selectIsAuthenticated = (state: RootState) => state[AUTH_SLICE_NAME].isAuthenticated;

export const selectIsAuthLoading = (state: RootState) => state[AUTH_SLICE_NAME].isAuthLoading;

export const selectAccessToken = (state: RootState) => state[AUTH_SLICE_NAME].accessToken;

export const selectUserDetails = (state: RootState) => state[AUTH_SLICE_NAME].user;

export const selectUserEmail = (state: RootState) => state[AUTH_SLICE_NAME]?.user?.email;

export default authSlice.reducer