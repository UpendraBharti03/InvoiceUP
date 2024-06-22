import { useEffect } from "react";
import { Col, Row } from "antd";
import { useFormikContext } from "formik";
import { FormikForm, ATextField, AButton, ATextAreaField } from "@ant-ui";
import { validateZodSchemaFormik } from "@ui-helpers";
import { InvoiceFormZS, TInvoiceFormZS } from "@/@types/invoice";
import { InvoiceEditor } from "@/components/invoice/editor/InvoiceEditor";
import { InvoicePreview } from "@/components/invoice/preview/InvoicePreview";

const InvoiceFormContent = () => {
    const { isSubmitting, values, setFieldValue } = useFormikContext<TInvoiceFormZS>();

    return (
        <>
            <Row gutter={10}>
                {/* Editor */}
                <Col md={12} xs={24}>
                    <InvoiceEditor />
                    <div className={"flex items-center justify-center mt-4"}>
                        <AButton type="primary" loading={isSubmitting} htmlType="submit">
                            Save
                        </AButton>
                    </div>
                </Col>

                {/* Preview */}
                <Col md={12} xs={24}>
                    <div className={"bg-white rounded w-full h-full mb-10"}>
                        <InvoicePreview invoiceDetails={values} />
                    </div>
                </Col>
            </Row>
        </>
    );
}

const InvoiceForm = ({ initialValues, handleSubmit }: { initialValues: TInvoiceFormZS; handleSubmit: (values: TInvoiceFormZS) => Promise<void> }) => {

    const validateForm = async (values: TInvoiceFormZS) => {
        const zodErrors: Partial<TInvoiceFormZS> = validateZodSchemaFormik({
            schema: InvoiceFormZS,
            values,
        });
        return zodErrors;
    }

    return (
        <FormikForm initialValues={initialValues} validate={validateForm} onSubmit={handleSubmit}>
            <InvoiceFormContent />
        </FormikForm>
    )
}

export default InvoiceForm;