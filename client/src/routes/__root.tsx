import { TAuthSliceState } from '@/@types/auth';
import CustomLayout from '@/layout/Layout';
import { AUTH_SLICE_NAME } from '@/redux/slices/authSlice';
import { store } from '@/redux/store';
import { QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createRootRoute, createRootRouteWithContext, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import React from 'react';

// import { TanStackRouterDevtools } from '@tanstack/router-devtools'

interface MyRouterContext {
    // The ReturnType of your useAuth hook or the value of your AuthContext
    [AUTH_SLICE_NAME]: TAuthSliceState;
    queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
    component: () => <RootComponent />,
})

const RootComponent = () => {
    const isAuthenticated = store?.getState()[AUTH_SLICE_NAME]?.isAuthenticated;
    const Layout = isAuthenticated ? CustomLayout : React.Fragment;
    return (
        <Layout>
                {/* <div className="p-2 flex gap-2 bg-amber-400">
                <Link to="/" className="[&.active]:font-bold">
                    Home
                </Link>{' '}
                <Link to="/about" className="[&.active]:font-bold">
                    About
                </Link>
            </div> */}
            <Outlet />
            <ReactQueryDevtools buttonPosition="top-right" />
            <TanStackRouterDevtools position="bottom-right" />
        </Layout>
    )
}