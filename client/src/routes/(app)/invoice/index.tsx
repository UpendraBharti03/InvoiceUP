import CreateInvoicePage from '@/components/invoice/CreateInvoicePage';
import { authenticate } from '@/layout/auth/authenticate';
import { AUTH_SLICE_NAME } from '@/redux/slices/authSlice';
import { store } from '@/redux/store';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(app)/invoice/')({
    beforeLoad: ({ context }) => {
        // we have to reassign auth slice state in route context
        context.auth = store.getState()[AUTH_SLICE_NAME]
        const auth = context.auth;
        authenticate({ auth, isAuthenticatedRoute: true });
      },
    component: () => <CreateInvoicePage />
})