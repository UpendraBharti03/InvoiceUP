import { useGetInvoicesList } from "@/services/invoiceService";

const InvoicesListPage = () => {
    const { data: invoicesList, isLoading: isInvoicesListLoading } = useGetInvoicesList({
        page: 1,
        limit: 10,
        search: "",
        filter: {},
    });

    return (
        <div>Hello /(app)/invoices</div>
    )
}

export default InvoicesListPage;