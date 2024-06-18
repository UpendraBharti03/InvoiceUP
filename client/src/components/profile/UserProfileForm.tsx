import { Col, Row, Tooltip } from "antd";
import { FormikHelpers, useFormikContext } from "formik";
import { Pen, X } from "lucide-react";
import { FormikForm, ATextField, AButton } from "@ant-ui";
import { validateZodSchemaFormik } from "@ui-helpers";
import { UserProfileFormZS, TUserProfileFormZS } from "@/@types/profile";
import { themeColors } from "@/theme";

const UserProfileFormContent = () => {
    const { values, isSubmitting, setFieldValue, resetForm } = useFormikContext<TUserProfileFormZS>();

    return (
        <>
            <div className={"absolute top-2 right-2"}>
                <Tooltip placement="right" title={values?.isEditable ? "Cancel" : "Edit profile"} color={themeColors.colorPrimary2}>
                    <AButton
                        ghost
                        onClick={() => {
                            if (values?.isEditable) {
                                resetForm();
                            } else {
                                setFieldValue("isEditable", true);
                            }
                        }}
                        icon={values?.isEditable ? <X className={"w-4 h-4 text-color-primary-2"} /> : <Pen className={"w-4 h-4 text-color-primary-2"} />}
                    ></AButton>
                </Tooltip>
            </div>
            <Row gutter={10}>
                <Col span={24}>
                    <ATextField name="name.first" label="First name" placeholder="Enter your first name" disabled={!values?.isEditable} />
                </Col>
                <Col span={24}>
                    <ATextField name="name.last" label="Last name" placeholder="Enter your last name" disabled={!values?.isEditable} />
                </Col>
                <Col span={24}>
                    <ATextField name="email" label="Email" placeholder="Enter your email" disabled />
                </Col>

                <Col span={24}>
                    <div className={"flex items-center justify-center mt-4"}>
                        <AButton type="primary" disabled={!values?.isEditable} loading={isSubmitting} htmlType="submit">
                            Save
                        </AButton>
                    </div>
                </Col>
            </Row>
        </>
    );
}

const UserProfileForm = ({ initialValues, handleSubmit }: { initialValues: TUserProfileFormZS; handleSubmit: (values: TUserProfileFormZS, formikHelpers?: FormikHelpers<TUserProfileFormZS>) => Promise<void> }) => {

    const validateForm = async (values: TUserProfileFormZS) => {
        const zodErrors: Partial<TUserProfileFormZS> = validateZodSchemaFormik({
            schema: UserProfileFormZS,
            values,
        });
        console.log('-> errors', zodErrors);
        return zodErrors;
    }

    return (
        <FormikForm initialValues={initialValues} validate={validateForm} onSubmit={handleSubmit}>
            <UserProfileFormContent />
        </FormikForm>
    )
}

export default UserProfileForm;