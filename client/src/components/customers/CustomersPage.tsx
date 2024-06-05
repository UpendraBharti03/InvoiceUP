import { Col, Flex, Popconfirm, Row, Spin, theme } from "antd";
import { Edit2Icon, Trash } from "lucide-react";
import { LoadingOutlined } from '@ant-design/icons';
import { AButton, ACard } from "@ant-ui";
import { useModalState } from "@ui-helpers";
import { TCustomerZS } from "@/@types/zodSchema/customerZS";
import { useDeleteCustomer, useGetCustomersList } from "@/services/customersService";
import CustomerFormDrawer from "@/components/customers/CustomerFormDrawer";

const CustomerItem = ({ customer }: { customer: TCustomerZS }) => {
    const { token: themeToken } = theme.useToken();
    const { mutateAsync: deleteCustomerMutateAsync } = useDeleteCustomer();
    const { isOpen: isEditCustomerModelOpen, handleOpen: handleEditCustomerModelOpen, handleClose: handleEditCustomerModelClose } = useModalState();

    const handleDeleteCustomer = async () => {
        await deleteCustomerMutateAsync({ _id: customer?._id });
    }

    return (
        <ACard
            title={customer?.name?.fullName}
            extra={
                <div className={"flex gap-2"}>
                    <AButton ghost size="small" onClick={handleEditCustomerModelOpen} icon={<Edit2Icon className={"text-color-primary w-4 h-4"} />}></AButton>
                    <Popconfirm
                        title="Delete customer?"
                        description="Are you sure you want to delete this customer?"
                        onConfirm={handleDeleteCustomer}
                        okButtonProps={{
                            danger: true,
                        }}
                        okText="Delete"
                        cancelText="Cancel"
                    >
                        <AButton ghost size="small" icon={<Trash className={"text-red-500 w-4 h-4"} />}></AButton>
                    </Popconfirm>
                </div>
            }
            styles={{
                header: {
                    padding: themeToken?.paddingXS
                },
            }}
        >
            <h6>{customer?.email}</h6>

            <CustomerFormDrawer
                key={customer?._id}
                open={isEditCustomerModelOpen}
                handleClose={handleEditCustomerModelClose}
                initialValues={{
                    _id: customer?._id,
                    name: customer?.name,
                    email: customer?.email,
                    phone: customer?.phone,
                    address: customer?.address ?? "",
                }}
            />
        </ACard>
    );
}

const CustomersPage = () => {

    const { data: customersList, isLoading: isCustomersListLoading } = useGetCustomersList({
        page: 1,
        limit: 10,
        search: "",
        filter: {},
    });
    const { isOpen: isAddCustomerModelOpen, handleOpen: handleAddCustomerModelOpen, handleClose: handleAddCustomerModelClose } = useModalState();

    if (isCustomersListLoading) {
        return (
            <Flex className={"h-screen w-full bg-color-bg-layout"} justify={"center"} align={"center"}>
                <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
            </Flex>
        )
    }

    return (
        <div>
            <div>
                <AButton onClick={handleAddCustomerModelOpen}>Add Customer</AButton>
                <CustomerFormDrawer open={isAddCustomerModelOpen} handleClose={handleAddCustomerModelClose} />
            </div>
            <Row gutter={[10, 10]}>
                {customersList?.results?.map((customer) => (
                    <Col key={customer?._id} xs={24} sm={12} md={6} lg={4}>
                        <CustomerItem customer={customer} />
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default CustomersPage;