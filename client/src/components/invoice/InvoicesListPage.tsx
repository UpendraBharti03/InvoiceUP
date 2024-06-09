import { useMemo, useState } from "react";
import dayjs from 'dayjs';
import { Flex, Popconfirm, Spin, TableColumnsType } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import { Pencil, Trash } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { AButton, ATable } from "@ant-ui";
import { useDeleteInvoice, useGetInvoicesList } from "@/services/invoiceService";
import { TInvoiceZS } from "@/@types/zodSchema/invoiceZS";
import { TableWithPagination } from "@/components/ui/TableWithPagination";

const InvoiceActions = ({ record }: { record: TInvoiceZS }) => {
    const { mutateAsync: deleteInvoiceMutateAsync, isPending } = useDeleteInvoice();

    const handleDeleteInvoice = async () => {
        await deleteInvoiceMutateAsync({ _id: record?._id })
    }

    return (
        <div className="flex items-center gap-2">
            <>
                <Link to={`/invoice/${record?._id}`}>
                    <AButton
                        ghost
                        size="small"
                        icon={<Pencil className="text-color-primary-2 w-4 h-4" />}
                    ></AButton>
                </Link>
            </>
            <Popconfirm
                title="Delete invoice?"
                description="Are you sure you want to delete this invoice?"
                onConfirm={handleDeleteInvoice}
                disabled={isPending}
                okButtonProps={{
                    danger: true,
                    disabled: isPending,
                    loading: isPending,
                }}
                okText="Delete"
                cancelText="Cancel"
            >
                <AButton ghost danger disabled={isPending} loading={isPending} size="small" icon={<Trash className={"w-4 h-4"} />}></AButton>
            </Popconfirm>
        </div>
    );
}

const InvoicesListPage = () => {
    const { data: invoicesList, isLoading: isInvoicesListLoading } = useGetInvoicesList({
        page: 1,
        limit: 10,
        search: "",
        filter: {},
    });
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);

    const { mutateAsync: deleteInvoiceMutateAsync, isPending } = useDeleteInvoice();

    const handleDeleteInvoice = async ({ _id }: { _id: string }) => {
        await deleteInvoiceMutateAsync({ _id })
    }

    const invoiceTableColumns = useMemo(() => {
        const columns: TableColumnsType<TInvoiceZS> = [
            {
                title: 'Customer',
                dataIndex: 'customer',
                key: 'customer',
                ellipsis: true,
                render: (_, record) => <span>{record?.customer?.name?.fullName}</span>,
            },
            {
                title: 'Due date',
                dataIndex: 'dueDate',
                key: 'dueDate',
                ellipsis: true,
                render: (value) => <span>{dayjs(value).format('DD/MM/YYYY')}</span>,
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
                render: (_, record) => <InvoiceActions record={record} />,
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

    if (!invoicesList) {
        return <></>
    }

    return (
        <div>
            <div className={"mb-3"}>
                <Link to={`/invoice`}>
                    <AButton>Add Invoice</AButton>
                </Link>
            </div>
            <TableWithPagination<TInvoiceZS> data={invoicesList} columns={invoiceTableColumns} page={page} setPage={setPage} limit={limit} setLimit={setLimit} />
        </div>
    )
}

export default InvoicesListPage;