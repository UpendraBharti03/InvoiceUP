import { AButton, ACard } from "@ant-ui";
import { useModalState } from "@ui-helpers";
import ProductFormDrawer from "@/components/products/ProductFormDrawer";
import { useDeleteProduct, useGetProductsList } from "@/services/productsService";
import { Col, Flex, Popconfirm, Row, Spin, theme } from "antd";
import { Edit2Icon, Trash } from "lucide-react";
import { LoadingOutlined } from '@ant-design/icons';
import { TProductZS } from "@/@types/zodSchema/productZS";

const ProductItem = ({ product }: { product: TProductZS }) => {
    const { token: themeToken } = theme.useToken();
    const { mutateAsync: deleteProductMutateAsync } = useDeleteProduct();
    const { isOpen: isEditProductModelOpen, handleOpen: handleEditProductModelOpen, handleClose: handleEditProductModelClose } = useModalState();

    const handleDeleteProduct = async () => {
        await deleteProductMutateAsync({ _id: product?._id });
    }

    return (
        <ACard
            title={product?.productName}
            extra={
                <div className={"flex gap-2"}>
                    <AButton ghost size="small" onClick={handleEditProductModelOpen} icon={<Edit2Icon className={"text-color-primary w-4 h-4"} />}></AButton>
                    <Popconfirm
                        title="Delete customer?"
                        description="Are you sure you want to delete this customer?"
                        onConfirm={handleDeleteProduct}
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
            <h6>{product?.productDescription}</h6>
            <div className={"flex justify-between"}>
                <div>
                    Amount: {product?.totalAmount}
                </div>
                <div>
                    Unit: {product?.measurementUnit}
                </div>
            </div>
            <ProductFormDrawer
                key={product?._id}
                open={isEditProductModelOpen}
                handleClose={handleEditProductModelClose}
                initialValues={{
                    _id: product?._id,
                    productName: product?.productName,
                    productDescription: product?.productDescription,
                    measurementUnit: product?.measurementUnit,
                    price: product?.price,
                    taxRate: product?.taxRate,
                    totalAmount: product?.totalAmount,
                }}
            />
        </ACard>
    );
}

const ProductsPage = () => {

    const { data: productsList, isLoading: isProductsListLoading } = useGetProductsList({
        page: 1,
        limit: 10,
        search: "",
        filter: {},
    });
    const { isOpen: isAddProductModelOpen, handleOpen: handleAddProductModelOpen, handleClose: handleAddProductModelClose } = useModalState();

    if (isProductsListLoading) {
        return (
            <Flex className={"h-screen w-full bg-color-bg-layout"} justify={"center"} align={"center"}>
                <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
            </Flex>
        )
    }

    return (
        <div>
            <div>
                <AButton onClick={handleAddProductModelOpen}>Add Product</AButton>
                <ProductFormDrawer open={isAddProductModelOpen} handleClose={handleAddProductModelClose} />
            </div>
            <Row gutter={[10, 10]}>
                {productsList?.results?.map((product) => (
                    <Col key={product?._id} xs={24} sm={12} md={6} lg={4}>
                        <ProductItem product={product} />
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default ProductsPage;