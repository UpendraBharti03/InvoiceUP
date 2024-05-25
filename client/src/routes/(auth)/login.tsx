import LoginPage from '@/components/login/LoginPage'
import UnAuthWrapper from '@/layout/auth/UnAuthWrapper'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)/login')({
  component: () => (
    <UnAuthWrapper>
        <LoginPage />
    </UnAuthWrapper>
  )
})