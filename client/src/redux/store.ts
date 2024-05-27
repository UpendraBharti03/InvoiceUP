import { configureStore } from '@reduxjs/toolkit'
import authSlice, { AUTH_SLICE_NAME } from "@/redux/slices/authSlice";
import { persistReducer } from 'redux-persist';
import createWebStorage from 'redux-persist/es/storage/createWebStorage';
import persistStore from 'redux-persist/es/persistStore';

const createNoopStorage = () => {
  return {
      getItem(_key: any) {
          return Promise.resolve(null);
      },
      setItem(_key: any, value: any) {
          return Promise.resolve(value);
      },
      removeItem(_key: any) {
          return Promise.resolve();
      },
  };
};

const storage = typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage();

const persistedAuthReducer = persistReducer(
  {
      key: AUTH_SLICE_NAME,
      storage,
  },
  authSlice
);

export const store = configureStore({
  reducer: {
    [AUTH_SLICE_NAME]: persistedAuthReducer,
  },
})

// @ts-ignore as per documentation manualPersist property exists in the config object.
export const persistor = persistStore(store, { manualPersist: true });

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch