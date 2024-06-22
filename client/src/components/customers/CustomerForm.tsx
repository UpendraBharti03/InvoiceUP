import { useEffect } from "react";
import { Col, Row } from "antd";
import { useFormikContext } from "formik";
import { FormikForm, ATextField, AButton, ATextAreaField } from "@ant-ui";
import { validateZodSchemaFormik } from "@ui-helpers";
import { CustomerFormZS, TCustomerFormZS } from "@/@types/customer";

const CustomerFormContent = () => {
    const { isSubmitting, values, setFieldValue } = useFormikContext<TCustomerFormZS>();

    useEffect(() => {
        setFieldValue("name.fullName", values?.name?.first + " " + values?.name?.last);
    }, [values?.name?.first, values?.name?.last])

    return (
        <>
            <Row gutter={10}>
                <Col span={24}>
                    <ATextField name="name.first" label="First name" placeholder="Enter first name" />
                </Col>
                <Col span={24}>
                    <ATextField name="name.last" label="Last name" placeholder="Enter last name" />
                </Col>
                <Col span={24}>
                    <ATextField name="email" label="Email" placeholder="Enter email" />
                </Col>
                <Col span={24}>
                    <ATextField name="phone" label="Phone" placeholder="Enter phone number" />
                </Col>
                <Col span={24}>
                    <ATextAreaField name="address" label="Address" placeholder="Enter address" />
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
        return zodErrors;
    }

    return (
        <FormikForm initialValues={initialValues} validate={validateForm} onSubmit={handleSubmit}>
            <CustomerFormContent />
        </FormikForm>
    )
}

export default CustomerForm;