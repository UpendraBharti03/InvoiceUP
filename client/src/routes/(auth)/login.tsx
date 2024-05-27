import LoginPage from '@/components/login/LoginPage'
import { authenticate } from '@/layout/auth/authenticate'
import { AUTH_SLICE_NAME } from '@/redux/slices/authSlice'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)/login')({
  beforeLoad: ({ context }) => {
    console.log("context", context)
    const auth = context[AUTH_SLICE_NAME];
    console.log("auth----", auth)
    authenticate({ auth, isAuthenticatedRoute: false });
  },
  loader: () => {
    console.log("in Loader ----->>>>>>")
  },
  component: () => (
    <LoginPage />
  )
})