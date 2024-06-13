import { useMemo, useState } from "react";
import dayjs from 'dayjs';
import { Flex, Popconfirm, Spin, TableColumnsType } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import { Pencil, Trash } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { AButton, ATable } from "@ant-ui";
import { capitalizeFirstLetter } from "@ui-helpers";
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
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const { data: invoicesList, isLoading: isInvoicesListLoading } = useGetInvoicesList({
        page,
        limit,
        search: "",
        filter: {},
    });

    const invoiceTableColumns = useMemo(() => {
        const columns: TableColumnsType<TInvoiceZS> = [
            {
                width: 200,
                title: 'Customer',
                dataIndex: 'customer',
                key: 'customer',
                ellipsis: true,
                // fixed: "left",
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
                render: (value) => <span>{capitalizeFirstLetter(value)}</span>
            },
            {
                title: 'Total Amount',
                dataIndex: 'totalAmount',
                key: 'totalAmount',
                ellipsis: true,
            },
            {
                width: 150,
                title: 'Action',
                dataIndex: 'action',
                key: 'action',
                // fixed: "right",
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
            <TableWithPagination<TInvoiceZS>
                data={invoicesList}
                columns={invoiceTableColumns}
                page={page}
                setPage={setPage}
                limit={limit}
                setLimit={setLimit}
                scroll={{ x: 700 }}
            />
        </div>
    )
}

export default InvoicesListPage;