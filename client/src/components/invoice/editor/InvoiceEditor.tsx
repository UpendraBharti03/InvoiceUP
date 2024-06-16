import { Col, Row } from "antd";
import { FieldArray, useFormikContext } from "formik";
import React, { useEffect, useMemo } from "react";
import { AButton, ADatePickerField, ASelectField, ATextAreaField, ATextField, cn } from "@ant-ui";
import { capitalizeFirstLetter } from "@ui-helpers";
import { TInvoiceFormZS } from "@/@types/invoice";
import { useGetCustomersList } from "@/services/customersService";
import { useGetProductsList } from "@/services/productsService";
import { InvoiceProductItem } from "@/components/invoice/editor/InvoiceProductItem";
import { InvoiceStatus } from "@/@types/zodSchema/invoiceZS";

export const InvoiceEditor = () => {
    const { data: customersList, isLoading: isCustomersListLoading, isRefetching: isCustomersListRefetching } = useGetCustomersList({
        page: 1,
        limit: "ALL",
        search: "",
        filter: {},
    });

    const { data: productsList, isLoading: isProductsListLoading, isRefetching: isProductsListRefetching } = useGetProductsList({
        page: 1,
        limit: "ALL",
        search: "",
        filter: {},
    });

    const { values, setFieldValue } = useFormikContext<TInvoiceFormZS>();

    useEffect(() => {
        if (values?.customerId && customersList?.results?.find(customer => customer?._id !== values?.customerId)) {
            setFieldValue("customer", customersList?.results?.find(customer => customer?._id === values?.customerId))
        }
    }, [values?.customerId]);

    useEffect(() => {
        let totalPrice = 0;
        values?.productItems?.forEach((productItem) => {
            totalPrice = totalPrice + productItem?.quantity * (productItem?.unitPrice - (productItem?.unitPrice * (productItem?.discount ?? 0)) / 100);
        })
        if (values?.totalPrice !== totalPrice) {
            setFieldValue("totalPrice", Number(totalPrice?.toFixed(2)));
        }
    }, [values?.productItems]);

    useEffect(() => {
        const totalAmount = values?.totalPrice + (values?.totalPrice * (values?.taxRate ?? 0))/100;
        if (values?.totalAmount !== totalAmount) {
            setFieldValue("totalAmount", Number(totalAmount?.toFixed(2)));
        }
    }, [values?.totalPrice, values?.taxRate]);

    const customerOptions = useMemo(() => {
        if (customersList?.results && customersList?.results?.length > 0) {
            return customersList?.results?.map((customer) => ({
                label: customer?.name?.fullName,
                value: customer?._id,
            }))
        }
        return [];
    }, [customersList])

    const productOptions = useMemo(() => {
        if (productsList?.results && productsList?.results?.length > 0) {
            return productsList?.results?.map((product) => ({
                label: product?.productName,
                value: product?._id,
            }))
        }
        return [];
    }, [productsList])

    const invoiceStatusOptions = useMemo(() => {
        return Object.values(InvoiceStatus)?.map((status) => ({
            label: capitalizeFirstLetter(status),
            value: status,
        }))
    }, [])

    return (
        <>
            <Row gutter={[10, 10]}>
                <Col span={24}>
                    <ASelectField name="customerId" label="Customer" placeholder="Select customer" options={customerOptions} loading={isCustomersListLoading} />
                </Col>
                <Col span={24}>
                    <ADatePickerField name="dueDate" label="due date" placeholder="Select due date" />
                </Col>
                <Col span={24}>
                    <ASelectField name="status" label="Status" placeholder="Select status" options={invoiceStatusOptions} />
                </Col>
                <Col span={24}>
                    <FieldArray
                        name="productItems"
                        render={(arrayHelpers) => (
                            <>
                                {values?.productItems?.map((productItem, index) => (
                                    <Row key={index} gutter={[10, 10]} align={"middle"} className={cn("border-b", {"border-t": index === 0})}>
                                        <InvoiceProductItem arrayHelpers={arrayHelpers} productItem={productItem} productItemIndex={index} productsList={productsList!} productOptions={productOptions} />
                                    </Row>
                                ))}
                            </>
                        )}
                    />
                </Col>
                <Col xs={24} sm={12}>
                    <ATextField type={"number"} name="taxRate" min={0} label="Tax rate (%)" placeholder="Enter tax rate" />
                </Col>
                <Col xs={24} sm={12}>
                    <ATextField type={"number"} disabled name="totalAmount" min={0} label="Total amount" placeholder="Total amount" />
                </Col>
                <Col span={24}>
                    <ATextAreaField name="invoiceDescription" label="Invoice description" placeholder="Enter invoice description" />
                </Col>
            </Row>
        </>
    );
}