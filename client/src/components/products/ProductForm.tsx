import { Col, Row } from "antd";
import { useFormikContext } from "formik";
import { FormikForm, ATextField, AButton, ASelectField } from "@ant-ui";
import { validateZodSchemaFormik } from "@ui-helpers";
import { ProductFormZS, TProductFormZS } from "@/@types/product";
import { ProductMeasurementUnit } from "@/@types/zodSchema/productZS";
import { useMemo } from "react";

const ProductFormContent = () => {
    const { isSubmitting } = useFormikContext<TProductFormZS>();

    const productMeasurementUnitOptions = useMemo(() => {
        return Object.values(ProductMeasurementUnit)?.map((unit) => ({
            label: unit,
            value: unit,
        }))
    }, [])

    return (
        <>
            <Row gutter={10}>
                <Col span={24}>
                    <ATextField name="productName" label="Product name" placeholder="Enter product name" />
                </Col>
                <Col span={24}>
                    <ATextField name="productDescription" label="Product description" placeholder="Enter product description" />
                </Col>
                <Col span={24}>
                    <ASelectField name="measurementUnit" label="Measurement unit" placeholder="Select measurement unit" options={productMeasurementUnitOptions} />
                </Col>
                <Col span={24}>
                    <ATextField type={"number"} name="price" label="Price" placeholder="Enter product price" />
                </Col>
                <Col span={24}>
                    <ATextField type={"number"} name="taxRate" label="Tax rate (in %)" placeholder="Enter tax rate in %" />
                </Col>
                <Col span={24}>
                    <ATextField type={"number"} name="totalAmount" label="Total amount" placeholder="Total amount" disabled />
                </Col>

                <Col span={24}>
                    <div className={"flex items-center justify-center mt-4"}>
                        <AButton type="primary" loading={isSubmitting} htmlType="submit">
                            Save
                        </AButton>
                    </div>
                </Col>
            </Row>
        </>
    );
}

const ProductForm = ({ initialValues, handleSubmit }: { initialValues: TProductFormZS; handleSubmit: (values: TProductFormZS) => Promise<void> }) => {

    const validateForm = async (values: TProductFormZS) => {
        const zodErrors: Partial<TProductFormZS> = validateZodSchemaFormik({
            schema: ProductFormZS,
            values,
        });
        console.log('-> errors', zodErrors);
        return zodErrors;
    }

    return (
        <FormikForm initialValues={initialValues} validate={validateForm} onSubmit={handleSubmit}>
            <ProductFormContent />
        </FormikForm>
    )
}

export default ProductForm;