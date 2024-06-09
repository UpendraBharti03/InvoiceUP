import { Col, Flex, Popconfirm, Row, Spin, TableColumnsType, theme } from "antd";
import { Edit2Icon, Pencil, Trash } from "lucide-react";
import { LoadingOutlined } from '@ant-design/icons';
import { AButton, ACard } from "@ant-ui";
import { useModalState } from "@ui-helpers";
import { TCustomerZS } from "@/@types/zodSchema/customerZS";
import { useDeleteCustomer, useGetCustomersList } from "@/services/customersService";
import CustomerFormDrawer from "@/components/customers/CustomerFormDrawer";
import { TableWithPagination } from "@/components/ui/TableWithPagination";
import { useMemo, useState } from "react";

const CustomerActions = ({ record }: { record: TCustomerZS }) => {
    const { mutateAsync: deleteCustomerMutateAsync, isPending } = useDeleteCustomer();
    const { isOpen: isEditCustomerModelOpen, handleOpen: handleEditCustomerModelOpen, handleClose: handleEditCustomerModelClose } = useModalState();

    const handleDeleteCustomer = async () => {
        await deleteCustomerMutateAsync({ _id: record?._id });
    }

    return (
        <div className="flex items-center gap-2">
            <>
                <AButton
                    ghost
                    size="small"
                    icon={<Pencil className="text-color-primary-2 w-4 h-4" />}
                    onClick={handleEditCustomerModelOpen}
                ></AButton>
                <CustomerFormDrawer
                    key={record?._id}
                    open={isEditCustomerModelOpen}
                    handleClose={handleEditCustomerModelClose}
                    initialValues={{
                        _id: record?._id,
                        name: record?.name,
                        email: record?.email,
                        phone: record?.phone,
                        address: record?.address ?? "",
                    }}
                />
            </>
            <Popconfirm
                title="Delete customer?"
                description="Are you sure you want to delete this customer?"
                onConfirm={handleDeleteCustomer}
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

const CustomersPage = () => {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const { data: customersList, isLoading: isCustomersListLoading, isRefetching: isCustomersListRefetching } = useGetCustomersList({
        page,
        limit,
        search: "",
        filter: {},
    });
    const { isOpen: isAddCustomerModelOpen, handleOpen: handleAddCustomerModelOpen, handleClose: handleAddCustomerModelClose } = useModalState();

    const customerTableColumns = useMemo(() => {
        const columns: TableColumnsType<TCustomerZS> = [
            {
                title: 'Customer name',
                dataIndex: 'name',
                key: 'name',
                ellipsis: true,
                render: (_, record) => <span>{record?.name?.fullName}</span>,
            },
            {
                title: 'Email',
                dataIndex: 'email',
                key: 'email',
                ellipsis: true,
            },
            {
                title: 'Phone',
                dataIndex: 'phone',
                key: 'phone',
                ellipsis: true,
            },
            {
                title: 'Address',
                dataIndex: 'address',
                key: 'address',
                ellipsis: true,
                render: (value) => <span>{value ? value : "-"}</span>
            },
            {
                title: 'Action',
                dataIndex: 'action',
                key: 'action',
                render: (_, record) => <CustomerActions record={record} />,
            },
        ];
        return columns;
    }, [])

    if (isCustomersListLoading && !isCustomersListRefetching) {
        return (
            <Flex className={"h-screen w-full bg-color-bg-layout"} justify={"center"} align={"center"}>
                <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
            </Flex>
        )
    }

    if (!customersList) {
        return <></>
    }

    return (
        <div>
            <div className={"mb-3"}>
                <AButton onClick={handleAddCustomerModelOpen}>Add Customer</AButton>
                <CustomerFormDrawer open={isAddCustomerModelOpen} handleClose={handleAddCustomerModelClose} />
            </div>
            <TableWithPagination<TCustomerZS>
                data={customersList}
                loading={isCustomersListRefetching}
                columns={customerTableColumns}
                page={page}
                setPage={setPage}
                limit={limit}
                setLimit={setLimit}
            />
        </div>
    )
}

export default CustomersPage;