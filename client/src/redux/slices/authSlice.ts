import { TAuthPayload, TAuthSliceState, TProfile } from '@/@types/auth';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '@/redux/store';
import { callApi } from '@/utils/apiUtils/callApi';
import { loginRequest, signupRequest } from '@/services/authService';
import { extractDataFromResponse, parseApiErrorResponse } from '@/utils/apiUtils/parser';

const initialState: TAuthSliceState = {
    isAuthenticated: false,
    isAuthLoading: false,
    accessToken: '',
    user: null,
}

export const SLICE_NAME = "auth";

export const signupUser = createAsyncThunk(`${SLICE_NAME}/signup`, async (payload: TAuthPayload, thunkAPI) => {
  try {
    const response = await signupRequest(payload);
    return extractDataFromResponse({ response }) as TProfile;
  } catch (error) {
    return thunkAPI.rejectWithValue(parseApiErrorResponse({ error, showToast: true }));
  }
})

export const loginUser = createAsyncThunk(`${SLICE_NAME}/login`, async (payload: Pick<TAuthPayload, "email" | "password">, thunkAPI) => {
  try {
    const response = await loginRequest(payload);
    return extractDataFromResponse({ response }) as TProfile;
  } catch (error) {
    return thunkAPI.rejectWithValue(parseApiErrorResponse({ error, showToast: true }));
  }
})

export const authSlice = createSlice({
  name: SLICE_NAME,
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
    })
    builders.addCase(signupUser.fulfilled, (state, {payload}) => {
      const accessToken = payload?.tokens?.access?.token ?? '';
      state.accessToken = accessToken;
      state.isAuthenticated = true;
      state.isAuthLoading = false;
      state.user = payload?.user ?? {};
    })
    builders.addCase(signupUser.rejected, (state) => {
      state.isAuthLoading = false;
    })

    builders.addCase(loginUser.pending, (state) => {
      state.isAuthLoading = true;
    })
    builders.addCase(loginUser.fulfilled, (state, {payload}) => {
      const accessToken = payload?.tokens?.access?.token ?? '';
      state.accessToken = accessToken;
      state.isAuthenticated = true;
      state.isAuthLoading = false;
      state.user = payload?.user ?? {};
    })
    builders.addCase(loginUser.rejected, (state) => {
      state.isAuthLoading = false;
    })
  }
})

// Action creators are generated for each case reducer function
// @ts-ignore - TODO: type check
export const { setToken } = authSlice.actions

export const selectIsAuthenticated = (state: RootState) => state[SLICE_NAME].isAuthenticated;

export const selectIsAuthLoading = (state: RootState) => state[SLICE_NAME].isAuthLoading;

export const selectAccessToken = (state: RootState) => state[SLICE_NAME].accessToken;

export const selectUserDetails = (state: RootState) => state[SLICE_NAME].user;

export const selectUserEmail = (state: RootState) => state[SLICE_NAME]?.user?.email;

export default authSlice.reducer