// import { selectIsAuthenticated } from '@/redux/slices/authSlice';
import DashboardPage from '@/components/dashboard/DashboardPage'
import { authenticate } from '@/layout/auth/authenticate';
import { AUTH_SLICE_NAME } from '@/redux/slices/authSlice';
import { createFileRoute, redirect } from '@tanstack/react-router'
// import { useSelector } from 'react-redux';

export const Route = createFileRoute('/(app)/dashboard')({
  beforeLoad: ({ context }) => {
    const auth = context[AUTH_SLICE_NAME];
    console.log("auth--,,,-->>>>", auth)
    authenticate({ auth, isAuthenticatedRoute: true });
  },
  component: () => <DashboardPage />
})