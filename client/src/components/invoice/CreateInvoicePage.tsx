import dayjs from 'dayjs';
import { useNavigate } from '@tanstack/react-router';
import { TInvoiceFormZS } from "@/@types/invoice";
import { InvoiceStatus } from "@/@types/zodSchema/invoiceZS";
import InvoiceForm from "@/components/invoice/InvoiceForm";
import { useCreateInvoice } from "@/services/invoiceService";

const CreateInvoicePage = () => {
    const navigate = useNavigate();
    const {mutateAsync: createInvoiceMutateAsync, isPending} = useCreateInvoice();

    const handleCreateInvoiceSubmit = async (values: TInvoiceFormZS) => {
        const payload = {
            ...values
        }

        const data = await createInvoiceMutateAsync(payload);
        if (!data?.error) {
            navigate({ to: `/invoice/${data?.result?._id}` });
        }
    }

    return (
        <div>
            <InvoiceForm
                initialValues={{
                    customer: null,
                    customerId: "",
                    invoiceDescription: "",
                    dueDate: dayjs().format(),
                    status: InvoiceStatus.UNPAID,
                    totalPrice: 0,
                    taxRate: 0,
                    totalAmount: 0,
                    productItems: [
                        {
                            product: null,
                            productId: "",
                            quantity: 1,
                            unitPrice: 0,
                            discount: 0,
                        }
                    ]
                }}
                handleSubmit={handleCreateInvoiceSubmit}
            />
        </div>
    )
}

export default CreateInvoicePage;