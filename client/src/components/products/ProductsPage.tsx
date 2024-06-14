import { useMemo, useState } from "react";
import { Flex, Popconfirm, Spin, TableColumnsType } from "antd";
import { Pencil, Trash } from "lucide-react";
import { LoadingOutlined } from '@ant-design/icons';
import { AButton } from "@ant-ui";
import { useModalState } from "@ui-helpers";
import ProductFormDrawer from "@/components/products/ProductFormDrawer";
import { useDeleteProduct, useGetProductsList } from "@/services/productsService";
import { TProductZS } from "@/@types/zodSchema/productZS";
import { TableWithPagination } from "@/components/ui/TableWithPagination";

const ProductActions = ({ record }: { record: TProductZS }) => {
    const { mutateAsync: deleteProductMutateAsync, isPending } = useDeleteProduct();
    const { isOpen: isEditProductModelOpen, handleOpen: handleEditProductModelOpen, handleClose: handleEditProductModelClose } = useModalState();

    const handleDeleteProduct = async () => {
        await deleteProductMutateAsync({ _id: record?._id });
    }

    return (
        <div className="flex items-center gap-2">
            <>
                <AButton
                    ghost
                    size="small"
                    icon={<Pencil className="text-color-primary-2 w-4 h-4" />}
                    onClick={handleEditProductModelOpen}
                ></AButton>
                <ProductFormDrawer
                key={record?._id}
                open={isEditProductModelOpen}
                handleClose={handleEditProductModelClose}
                initialValues={{
                    _id: record?._id,
                    productName: record?.productName,
                    productDescription: record?.productDescription,
                    measurementUnit: record?.measurementUnit,
                    price: record?.price,
                    taxRate: record?.taxRate,
                    totalAmount: record?.totalAmount,
                }}
            />
            </>
            <Popconfirm
                title="Delete product?"
                description="Are you sure you want to delete this product?"
                onConfirm={handleDeleteProduct}
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

const ProductsPage = () => {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const { data: productsList, isLoading: isProductsListLoading, isRefetching: isProductsListRefetching } = useGetProductsList({
        page,
        limit,
        search: "",
        filter: {},
    });
    const { isOpen: isAddProductModelOpen, handleOpen: handleAddProductModelOpen, handleClose: handleAddProductModelClose } = useModalState();

    const productTableColumns = useMemo(() => {
        const columns: TableColumnsType<TProductZS> = [
            {
                title: 'Product name',
                dataIndex: 'productName',
                key: 'productName',
                ellipsis: true,
            },
            {
                title: 'Product description',
                dataIndex: 'productDescription',
                key: 'productDescription',
                ellipsis: true,
                render: (value) => <span>{value ? value : "-"}</span>
            },
            {
                title: 'Price',
                dataIndex: 'price',
                key: 'price',
                ellipsis: true,
                render: (value, record) => value ? <span>{value}/{record?.measurementUnit}</span> : "-"
            },
            {
                title: 'Tax rate (%)',
                dataIndex: 'taxRate',
                key: 'taxRate',
                ellipsis: true,
            },
            {
                title: 'Total amount',
                dataIndex: 'totalAmount',
                key: 'totalAmount',
                ellipsis: true,
                render: (value, record) => value ? <span>{value}/{record?.measurementUnit}</span> : "-"
            },
            {
                width: 150,
                title: 'Action',
                dataIndex: 'action',
                key: 'action',
                render: (_, record) => <ProductActions record={record} />,
            },
        ];
        return columns;
    }, [])

    if (isProductsListLoading) {
        return (
            <Flex className={"h-screen w-full bg-color-bg-layout"} justify={"center"} align={"center"}>
                <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
            </Flex>
        )
    }

    if (!productsList) {
        return <></>
    }

    return (
        <div>
            <div className={"mb-3"}>
                <AButton onClick={handleAddProductModelOpen}>Add Product</AButton>
                <ProductFormDrawer open={isAddProductModelOpen} handleClose={handleAddProductModelClose} />
            </div>
            <TableWithPagination<TProductZS>
                data={productsList}
                loading={isProductsListRefetching}
                columns={productTableColumns}
                page={page}
                setPage={setPage}
                limit={limit}
                setLimit={setLimit}
                scroll={{x: 700}}
            />
        </div>
    )
}

export default ProductsPage;