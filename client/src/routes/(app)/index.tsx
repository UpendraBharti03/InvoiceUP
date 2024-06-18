// import { selectIsAuthenticated } from '@/redux/slices/authSlice';
import DashboardPage from '@/components/dashboard/DashboardPage'
import { authenticate } from '@/layout/auth/authenticate';
import { AUTH_SLICE_NAME } from '@/redux/slices/authSlice';
import { store } from '@/redux/store';
import { createFileRoute, redirect } from '@tanstack/react-router'
// import { useSelector } from 'react-redux';

export const Route = createFileRoute('/(app)/')({
  beforeLoad: ({ context }) => {
    // we have to reassign auth slice state in route context
    context.auth = store.getState()[AUTH_SLICE_NAME]
    const auth = context.auth;
    authenticate({ auth, isAuthenticatedRoute: true });
    redirect({
        to: "/dashboard",
        throw: true,
    })
  },
//   component: () => <DashboardPage />
})