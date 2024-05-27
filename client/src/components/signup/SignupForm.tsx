import { Col, Row } from "antd";
import { useFormikContext } from "formik";
import { FormikForm, ATextField, AButton, APasswordField } from "@ant-ui";
import { validateZodSchemaFormik } from "@ui-helpers";
import { SignupFormZS, TSignupFormZS } from "@/@types/auth";

const SignupFormContent = () => {
    const { isSubmitting } = useFormikContext<TSignupFormZS>();

    return (
        <div className={"h-full flex flex-col"}>
            <Row gutter={10}>
            <Col span={12}>
                    <ATextField name="firstName" label="First name" />
                </Col>
                <Col span={12}>
                    <ATextField name="lastName" label="Last name" />
                </Col>
                <Col span={24}>
                    <ATextField name="email" label="Email" />
                </Col>
                <Col span={24}>
                    <APasswordField name="password" label="Password" />
                </Col>
                <Col span={24}>
                    <APasswordField name="confirmPassword" label="Confirm password" />
                </Col>

                <Col span={24}>
                    <div className={"flex items-center justify-center"}>
                        <AButton type="primary" loading={isSubmitting} htmlType="submit">
                            Signup
                        </AButton>
                    </div>
                </Col>
            </Row>
        </div>
    );
}

const SignupForm = ({ initialValues, handleSubmit }: { initialValues: TSignupFormZS; handleSubmit: (values: TSignupFormZS) => Promise<void> }) => {

    const validateForm = async (values: TSignupFormZS) => {
        const zodErrors: Partial<TSignupFormZS> = validateZodSchemaFormik({
            schema: SignupFormZS,
            values,
        });
        console.log('-> errors', zodErrors);
        return zodErrors;
    }

    return (
        <FormikForm initialValues={initialValues} validate={validateForm} onSubmit={handleSubmit}>
            <SignupFormContent />
        </FormikForm>
    )
}

export default SignupForm;