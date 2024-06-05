import { Col, Row } from "antd";
import { useFormikContext } from "formik";
import { FormikForm, ATextField, AButton, ASelectField } from "@ant-ui";
import { validateZodSchemaFormik } from "@ui-helpers";
import { CustomerFormZS, TCustomerFormZS } from "@/@types/customer";
import { useEffect, useMemo } from "react";

const CustomerFormContent = () => {
    const { isSubmitting } = useFormikContext<TCustomerFormZS>();

    return (
        <>
            <Row gutter={10}>
                <Col span={24}>
                    <ATextField name="name.first" label="First name" placeholder="Enter first name" />
                </Col>
                <Col span={24}>
                    <ATextField name="name.first" label="Last name" placeholder="Enter last name" />
                </Col>
                <Col span={24}>
                    <ATextField name="email" label="Email" placeholder="Enter email" />
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

const CustomerForm = ({ initialValues, handleSubmit }: { initialValues: TCustomerFormZS; handleSubmit: (values: TCustomerFormZS) => Promise<void> }) => {

    const validateForm = async (values: TCustomerFormZS) => {
        const zodErrors: Partial<TCustomerFormZS> = validateZodSchemaFormik({
            schema: CustomerFormZS,
            values,
        });
        console.log('-> errors', zodErrors);
        return zodErrors;
    }

    return (
        <FormikForm initialValues={initialValues} validate={validateForm} onSubmit={handleSubmit}>
            <CustomerFormContent />
        </FormikForm>
    )
}

export default CustomerForm;