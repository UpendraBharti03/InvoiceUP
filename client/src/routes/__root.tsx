import { TAuthSliceState } from '@/@types/auth';
import { AUTH_SLICE_NAME } from '@/redux/slices/authSlice';
import { persistor } from '@/redux/store';
import { createRootRoute, createRootRouteWithContext, Link, Outlet } from '@tanstack/react-router'
import { useEffect } from 'react';
import { PersistGate } from 'redux-persist/integration/react';

// import { TanStackRouterDevtools } from '@tanstack/router-devtools'

interface MyRouterContext {
    // The ReturnType of your useAuth hook or the value of your AuthContext
    [AUTH_SLICE_NAME]: TAuthSliceState
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
    component: () => <RootComponent />,
})

const RootComponent = () => {
    // useEffect(() => {
    //     persistor.persist();
    // }, []);
    return (
        <>
            {/* <PersistGate loading={null} persistor={persistor}> */}
                {/* <div className="p-2 flex gap-2 bg-amber-400">
                <Link to="/" className="[&.active]:font-bold">
                    Home
                </Link>{' '}
                <Link to="/about" className="[&.active]:font-bold">
                    About
                </Link>
            </div> */}
                <Outlet />
                {/*<TanStackRouterDevtools />*/}
            {/* </PersistGate> */}
        </>
    )
}