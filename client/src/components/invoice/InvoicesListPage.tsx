import { useMemo } from "react";
import { Flex, Spin, TableColumnsType } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import { Pencil } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { AButton, ATable } from "@ant-ui";
import { useDeleteInvoice, useGetInvoicesList } from "@/services/invoiceService";
import { TInvoiceZS } from "@/@types/zodSchema/invoiceZS";

const InvoicesListPage = () => {
    const { data: invoicesList, isLoading: isInvoicesListLoading } = useGetInvoicesList({
        page: 1,
        limit: 10,
        search: "",
        filter: {},
    });

    const { mutateAsync: deleteInvoiceMutateAsync, isPending } = useDeleteInvoice();

    const handleDeleteInvoice = async ({ _id }: { _id: string }) => {
        await deleteInvoiceMutateAsync({ _id })
    }

    const invoiceTableColumns = useMemo(() => {
        const columns: TableColumnsType<TInvoiceZS> = [
            {
                title: 'Customer',
                dataIndex: 'customer.name.fullName',
                key: 'customer',
                ellipsis: true,
            },
            {
                title: 'Due date',
                dataIndex: 'dueDate',
                key: 'dueDate',
                ellipsis: true,
            },
            {
                title: 'Status',
                dataIndex: 'status',
                key: 'status',
                ellipsis: true,
            },
            {
                title: 'Total Amount',
                dataIndex: 'totalAmount',
                key: 'totalAmount',
                ellipsis: true,
            },
            {
                title: 'Action',
                dataIndex: 'action',
                key: 'action',
                render: (_, record) => (
                    <div className="flex items-center gap-2">
                        <Link href={`/invoice/${record?._id}`}>
                            <AButton ghost>
                                <Pencil className="text-color-primary-2 w-4 h-4" />
                            </AButton>
                        </Link>
                        <AButton ghost danger disabled={isPending} loading={isPending} onClick={() => handleDeleteInvoice({ _id: record?._id })}>
                            <Pencil className="text-color-primary-2 w-4 h-4" />
                        </AButton>
                    </div>
                ),
            },
        ];
        return columns;
    }, [])

    if (isInvoicesListLoading) {
        return (
            <Flex className={"h-screen w-full bg-color-bg-layout"} justify={"center"} align={"center"}>
                <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
            </Flex>
        )
    }

    return (
        <div>
            <ATable
                sticky
                dataSource={invoicesList?.results}
                columns={invoiceTableColumns}
                pagination={{
                    showSizeChanger: true,
                    onShowSizeChange: (current, pageSize) => console.log(current, pageSize),
                    current: invoicesList?.page,
                    pageSize: invoicesList?.totalPages,
                    total: invoicesList?.totalResults,
                    responsive: true,
                }}
            />
        </div>
    )
}

export default InvoicesListPage;