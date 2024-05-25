import { persistor, store } from '@/redux/store';
import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRoute({
    component: () => <RootComponent />,
})

const RootComponent = () => {
    useEffect(() => {
        persistor.persist();
    }, []);
    return (
        <>
        <Provider store={store}>
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
            </Provider>
            <ToastContainer transition={Slide} progressClassName="toastProgress" bodyClassName="toastBody" />
        </>
    )
}