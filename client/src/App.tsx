import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { Provider } from 'react-redux';
import { Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { PersistGate } from 'redux-persist/integration/react';

import { persistor, store } from '@/redux/store'
import { AUTH_SLICE_NAME } from '@/redux/slices/authSlice'
import './global.css'
import './index.css'

// Import the generated route tree
import { routeTree } from './routeTree.gen'
import { ConfigProvider } from 'antd';
import { themeColors } from '@/theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: Infinity,
        }
    },
});

// Create a new router instance
const router = createRouter({
    routeTree,
    context: {
        // auth will initially be undefined
        // We'll be passing down the auth state from within a React component
        [AUTH_SLICE_NAME]: undefined!,
        queryClient,
    },
})

// Register the router instance for type safety
declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}

// Render the app
const rootElement = document.getElementById('app')!
if (!rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement)
    root.render(
        <StrictMode>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <QueryClientProvider client={queryClient}>
                        <ConfigProvider
                            theme={{
                                token: {
                                    // Seed Token
                                    colorPrimary: themeColors.colorPrimary,
                                    colorBgLayout: themeColors.colorBgLayout,
                                    borderRadius: 20,
                                },
                            }}
                        >
                            <RouterProvider router={router} context={{ auth: store.getState()[AUTH_SLICE_NAME] }} />
                        </ConfigProvider>
                    </QueryClientProvider>
                </PersistGate>
            </Provider>
            <ToastContainer transition={Slide} progressClassName="toastProgress" bodyClassName="toastBody" />
        </StrictMode>,
    )
}

