import { AButton, ACard } from "@ant-ui";
import { useModalState } from "@ui-helpers";
import ProductFormDrawer from "@/components/products/ProductFormDrawer";
import { useGetProductsList } from "@/services/productsService";
import { Col, Flex, Row, Spin, theme } from "antd";
import { Edit2Icon } from "lucide-react";
import { LoadingOutlined } from '@ant-design/icons';
import { TProductZS } from "@/@types/zodSchema/productZS";

const ProductItem = ({ product }: { product: TProductZS }) => {
    const { token: themeToken } = theme.useToken();
    const { isOpen: isEditProductModelOpen, handleOpen: handleEditProductModelOpen, handleClose: handleEditProductModelClose } = useModalState();
    return (
        <ACard
            title={product?.productName}
            extra={
                <AButton ghost size="small" onClick={handleEditProductModelOpen} icon={<Edit2Icon className={"text-color-primary w-4 h-4"} />}></AButton>
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
            <Row gutter={10}>
                {productsList?.results?.map((product) => (
                    <Col key={product?._id} xs={1} sm={2} md={3} lg={4}>
                        <ProductItem product={product} />
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default ProductsPage;