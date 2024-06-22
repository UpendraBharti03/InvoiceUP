import { Col, Row } from "antd";
import { useFormikContext } from "formik";
import { FormikForm, ATextField, AButton, APasswordField } from "@ant-ui";
import { validateZodSchemaFormik } from "@ui-helpers";
import { LoginFormZS, TLoginFormZS } from "@/@types/auth";

const LoginFormContent = () => {
    const { isSubmitting } = useFormikContext<TLoginFormZS>();

    return (
        <div className={"h-full flex flex-col"}>
            <Row gutter={10}>
                <Col span={24}>
                    <ATextField name="email" label="Email" placeholder="Enter your email" />
                </Col>
                <Col span={24}>
                    <APasswordField name="password" label="Password" placeholder="Enter your password" />
                </Col>

                <Col span={24}>
                    <div className={"flex items-center justify-center mt-4"}>
                        <AButton type="primary" loading={isSubmitting} htmlType="submit">
                            Login
                        </AButton>
                    </div>
                </Col>
            </Row>
        </div>
    );
}

const LoginForm = ({ initialValues, handleSubmit }: { initialValues: TLoginFormZS; handleSubmit: (values: TLoginFormZS) => Promise<void> }) => {

    const validateForm = async (values: TLoginFormZS) => {
        const zodErrors: Partial<TLoginFormZS> = validateZodSchemaFormik({
            schema: LoginFormZS,
            values,
        });
        return zodErrors;
    }

    return (
        <FormikForm initialValues={initialValues} validate={validateForm} onSubmit={handleSubmit}>
            <LoginFormContent />
        </FormikForm>
    )
}

export default LoginForm;