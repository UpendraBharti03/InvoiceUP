import SignupPage from '@/components/signup/SignupPage'
import { authenticate } from '@/layout/auth/authenticate';
import { AUTH_SLICE_NAME } from '@/redux/slices/authSlice';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)/signup')({
    beforeLoad: ({ context }) => {
        const auth = context[AUTH_SLICE_NAME];
        authenticate({ auth, isAuthenticatedRoute: false });
      },
    component: () => (
            <SignupPage />
    )
})