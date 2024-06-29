import { useEffect } from "react";
import { Col, Row } from "antd";
import { useFormikContext } from "formik";
import { FormikForm, ATextField, AButton, ATextAreaField, ADrawer } from "@ant-ui";
import { useModalState, validateZodSchemaFormik } from "@ui-helpers";
import { InvoiceFormZS, TInvoiceFormZS } from "@/@types/invoice";
import { InvoiceEditor } from "@/components/invoice/editor/InvoiceEditor";
import { InvoicePreview } from "@/components/invoice/preview/InvoicePreview";
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Eye } from "lucide-react";

const InvoiceFormContent = () => {
    const { isSubmitting, values, setFieldValue } = useFormikContext<TInvoiceFormZS>();
    const { isOpen: isInvoicePreviewModelOpen, handleOpen: handleInvoicePreviewModelOpen, handleClose: handleInvoicePreviewModelClose } = useModalState();

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
                <Col md={12} xs={0}>
                    <div className={"bg-white border shadow-xl rounded-xl w-full mx-2 sticky top-4 h-[calc(100vh_-_32px)]"}>
                        <PerfectScrollbar options={{wheelPropagation: true }} style={{ padding: 16, height: '100%' }}>
                            <InvoicePreview invoiceDetails={values} />
                        </PerfectScrollbar>
                    </div>
                </Col>
            </Row>
            <div className={"block md:hidden fixed z-10 bottom-3 right-3"}>
                <AButton icon={<Eye />} onClick={handleInvoicePreviewModelOpen}></AButton>
                <ADrawer
                    title={"Invoice preview"}
                    size="large"
                    open={isInvoicePreviewModelOpen}
                    onClose={handleInvoicePreviewModelClose}
                >
                    <InvoicePreview invoiceDetails={values} />
                </ADrawer>
            </div>
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