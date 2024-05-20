import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isAuthenticate: false,
    isAuthLoading: false,
    user: null,
}

export const SLICE_NAME = "auth";



export const authSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    setTokens: (state, action) => {
        const { accessToken } = action?.payload ?? {};
        state.accessToken = accessToken;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setToken } = authSlice.actions

export default authSlice.reducer