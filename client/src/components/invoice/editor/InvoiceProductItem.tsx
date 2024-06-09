import { useEffect } from "react";
import { Col, Row } from "antd";
import { Plus, Trash } from "lucide-react";
import { FieldArrayRenderProps, useFormikContext } from "formik";
import { AButton, ASelectField, ATextField, cn } from "@ant-ui";
import { TInvoiceFormZS } from "@/@types/invoice"
import { TProductItem } from "@/@types/zodSchema/invoiceZS";
import { TPaginatedResponse } from "@/@types/common";
import { TProductZS } from "@/@types/zodSchema/productZS";

const emptyProductItem = {
    product: null,
    productId: "",
    quantity: 1,
    unitPrice: 0,
    discount: 0,
}

export const InvoiceProductItem = ({ arrayHelpers, productItem, productItemIndex, productsList, productOptions }: { arrayHelpers: FieldArrayRenderProps; productItem: TProductItem; productItemIndex: number; productsList: TPaginatedResponse<TProductZS>; productOptions: { label: string; value: string }[] }) => {
    const { values, setFieldValue } = useFormikContext<TInvoiceFormZS>();

    useEffect(() => {
        if (productItem?.productId) {
            setFieldValue(`productItems.${productItemIndex}.product`, productsList?.results?.find(product => product?._id === productItem?.productId))
            setFieldValue(`productItems.${productItemIndex}.unitPrice`, productsList?.results?.find(product => product?._id === productItem?.productId)?.totalAmount)
        }
    }, [productItem?.productId]);

    return (
        <>
            <Col xs={24} lg={12}>
                <ASelectField name={`productItems.${productItemIndex}.productId`} label="Product" placeholder="Select product" options={productOptions} />
            </Col>
            <Col xs={12} md={6} lg={3}>
                <ATextField type={"number"} name={`productItems.${productItemIndex}.quantity`} min={0} label="Quantity" placeholder="Enter quantity" />
            </Col>
            <Col xs={12} md={6} lg={3}>
                <ATextField type={"number"} name={`productItems.${productItemIndex}.unitPrice`} min={0} label="Unit price" placeholder="Enter unit price" />
            </Col>
            <Col xs={12} md={6} lg={3}>
                <ATextField type={"number"} name={`productItems.${productItemIndex}.discount`} min={0} max={100} label="Discount (%)" placeholder="Enter discount" />
            </Col>
            <Col xs={12} md={6} lg={3} className={cn(
                "flex items-center justify-center"
            )}>
                <AButton ghost className="border-0" icon={<Plus className={"text-color-primary-2 w-4 h-4"} />} onClick={() => arrayHelpers?.handleInsert(productItemIndex + 1, emptyProductItem)()}></AButton>
                {values?.productItems?.length > 1 && <AButton danger ghost className="border-0" icon={<Trash className={"w-4 h-4"} />} onClick={() => arrayHelpers?.remove(productItemIndex)}></AButton>}
            </Col>
        </>
    )
}