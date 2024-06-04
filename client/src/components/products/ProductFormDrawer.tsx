import { ADrawer } from "@ant-ui"
import { TProductFormZS } from "@/@types/product";
import ProductForm from "@/components/products/ProductForm";
import { ProductMeasurementUnit, TProductZS } from "@/@types/zodSchema/productZS";
import { useCreateProduct, useUpdateProduct } from "@/services/productsService";

const emptyInitialValues = {
    productName: "",
    productDescription: "",
    measurementUnit: ProductMeasurementUnit.ITEM,
    price: 0,
    taxRate: 0,
    totalAmount: 0,
}

const ProductFormDrawer = ({ open, handleClose, initialValues }: { open: boolean; handleClose: () => void; initialValues?: Omit<TProductZS, "userId"> }) => {
    const { mutateAsync: createProductMutateAsync } = useCreateProduct();
    const { mutateAsync: updateProductMutateAsync } = useUpdateProduct();

    const handleProductFormSubmit = async (values: TProductFormZS) => {
        let result: TProductZS;
        if (initialValues && initialValues?._id) {
            result = await updateProductMutateAsync({ ...values, _id: initialValues?._id });
        } else {
            result = await createProductMutateAsync(values);
        }
        console.log("result", result)
        if ("error" in result && !result?.error) {
            handleClose();
        }
    }

    return (
        <>
            <ADrawer
                title={initialValues?._id ? "Edit product" : "Add product"}
                size="large"
                open={open}
                onClose={handleClose}
            >
                <ProductForm
                    initialValues={initialValues?._id ? initialValues : emptyInitialValues}
                    handleSubmit={handleProductFormSubmit}
                />
            </ADrawer>
        </>
    )
}

export default ProductFormDrawer;