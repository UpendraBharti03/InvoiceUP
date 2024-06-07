import { createFileRoute } from '@tanstack/react-router'
import { authenticate } from '@/layout/auth/authenticate';
import { AUTH_SLICE_NAME } from '@/redux/slices/authSlice';
import { store } from '@/redux/store';
import InvoicesListPage from '@/components/invoice/InvoicesListPage';

export const Route = createFileRoute('/(app)/invoices')({
  beforeLoad: ({ context }) => {
    // we have to reassign auth slice state in route context
    context.auth = store.getState()[AUTH_SLICE_NAME]
    const auth = context.auth;
    authenticate({ auth, isAuthenticatedRoute: true });
  },
  component: () => <InvoicesListPage />
})