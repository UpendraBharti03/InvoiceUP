import SignupPage from '@/components/signup/SignupPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)/signup')({
    beforeLoad: () => {
        // redirect({
        //     to: "/",
        //     throw: true,
        // })
    },
    component: () => (
            <SignupPage />
    )
})