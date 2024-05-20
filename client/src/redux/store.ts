import { configureStore } from '@reduxjs/toolkit'
import authSlice, {SLICE_NAME as AUTH_SLICE_NAME} from "@/redux/slices/authSlice";

export const store = configureStore({
  reducer: {
    [AUTH_SLICE_NAME]: authSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch