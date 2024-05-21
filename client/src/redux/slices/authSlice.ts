import { TAuthPayload, TAuthSliceState, TProfile } from '@/@types/auth';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '@/redux/store';
import { callApi } from '@/utils/apiUtils/callApi';
import { signupRequest } from '@/services/authService';

const initialState: TAuthSliceState = {
    isAuthenticated: false,
    isAuthLoading: false,
    accessToken: '',
    user: null,
}

export const SLICE_NAME = "auth";

export const signup = createAsyncThunk("auth/signup", async (payload: TAuthPayload, thunkAPI) => {
    const response = await callApi({
      requestFunction: signupRequest(payload),
      thunkApi: thunkAPI,
    })
    return response as TProfile;
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
    builders.addCase(signup.pending, (state) => {
      state.isAuthLoading = true;
    })
    builders.addCase(signup.fulfilled, (state, {payload}) => {
      const accessToken = payload?.tokens?.access?.token ?? '';
      state.accessToken = accessToken;
      state.isAuthenticated = true;
      state.isAuthLoading = false;
      state.user = payload?.user ?? {};
    })
    builders.addCase(signup.rejected, (state) => {
      state.isAuthLoading = false;
    })
  }
})

// Action creators are generated for each case reducer function
export const { setToken } = authSlice.actions

export const selectUserEmail = (state: RootState) => state[SLICE_NAME]?.user?.email;

export default authSlice.reducer