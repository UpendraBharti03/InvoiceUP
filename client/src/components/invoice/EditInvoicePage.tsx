import dayjs from 'dayjs';
import { TInvoiceFormZS } from "@/@types/invoice";
import { InvoiceStatus, TInvoiceZS } from "@/@types/zodSchema/invoiceZS";
import InvoiceForm from "@/components/invoice/InvoiceForm";
import { useGetInvoiceDetails, useUpdateInvoice } from "@/services/invoiceService";
import { useParams } from '@tanstack/react-router';
import { Flex, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const EditInvoicePage = () => {
    const { invoiceId }: {invoiceId: string} = useParams({ strict: false })

    const {data: invoiceDetails, isLoading: isInvoiceDetailsLoading} = useGetInvoiceDetails({_id: invoiceId})

    const {mutateAsync: updateInvoiceMutateAsync, isPending} = useUpdateInvoice();


    const handleUpdateInvoiceSubmit = async (values: TInvoiceFormZS) => {
        const payload: Omit<TInvoiceZS, "userId"> = {
            ...values,
            _id: invoiceId,
        }

        const result = await updateInvoiceMutateAsync(payload);
        if ("error" in result && !result?.error) {
            
        }
    }

    if (isInvoiceDetailsLoading) {
        return (
            <Flex className={"h-screen w-full bg-color-bg-layout"} justify={"center"} align={"center"}>
                <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
            </Flex>
        )
    }

    return (
        <div>
            <InvoiceForm
                initialValues={{
                    customer: invoiceDetails?.customer ?? null,
                    customerId: invoiceDetails?.customerId ?? "",
                    invoiceDescription: invoiceDetails?.invoiceDescription,
                    dueDate: invoiceDetails?.dueDate ?? dayjs().format('DD/MM/YYYY'),
                    status: invoiceDetails?.status ?? InvoiceStatus.UNPAID,
                    totalPrice: invoiceDetails?.totalPrice ?? 0,
                    taxRate: invoiceDetails?.taxRate ?? 0,
                    totalAmount: invoiceDetails?.totalAmount ?? 0,
                    productItems: invoiceDetails?.productItems ?? [
                        {
                            product: null,
                            productId: "",
                            quantity: 1,
                            unitPrice: 0,
                            discount: 0,
                        }
                    ]
                }}
                handleSubmit={handleUpdateInvoiceSubmit}
            />
        </div>
    )
}

export default EditInvoicePage;