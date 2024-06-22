import { ADrawer } from "@ant-ui"
import { TCustomerFormZS } from "@/@types/customer";
import { TCustomerZS } from "@/@types/zodSchema/customerZS";
import { useCreateCustomer, useUpdateCustomer } from "@/services/customersService";
import CustomerForm from "@/components/customers/CustomerForm";

const emptyInitialValues: TCustomerFormZS = {
    name: {
        fullName: "",
        first: "",
        last: "",
    },
    email: "",
    phone: "",
    address: "",
}

const CustomerFormDrawer = ({ open, handleClose, initialValues }: { open: boolean; handleClose: () => void; initialValues?: Omit<TCustomerZS, "userId"> }) => {
    const { mutateAsync: createCustomerMutateAsync } = useCreateCustomer();
    const { mutateAsync: updateCustomerMutateAsync } = useUpdateCustomer();

    const handleCustomerFormSubmit = async (values: TCustomerFormZS) => {
        let result: TCustomerZS;
        if (initialValues && initialValues?._id) {
            result = await updateCustomerMutateAsync({ ...values, _id: initialValues?._id });
        } else {
            result = await createCustomerMutateAsync(values);
        }
        if ("error" in result && !result?.error) {
            handleClose();
        }
    }

    return (
        <>
            <ADrawer
                title={initialValues?._id ? "Edit customer" : "Add customer"}
                size="large"
                open={open}
                onClose={handleClose}
            >
                {open && (
                    <CustomerForm
                        initialValues={initialValues?._id ? initialValues : emptyInitialValues}
                        handleSubmit={handleCustomerFormSubmit}
                    />
                )}
            </ADrawer>
        </>
    )
}

export default CustomerFormDrawer;