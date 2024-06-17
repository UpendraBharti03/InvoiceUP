import { createFileRoute } from '@tanstack/react-router'
import InvoicePreviewPage from '@/components/invoice/InvoicePreviewPage'

export const Route = createFileRoute('/(app)/invoice/$invoiceId/invoice-preview')({
  component: () => <InvoicePreviewPage />
})