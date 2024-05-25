import { Col, Row } from "antd";
import { FormikForm, ATextField, AButton, APasswordField } from "@/libs/ant-ui";
import { useFormikContext } from "formik";

export type TLoginFormValues = {
    email: string;
    password: string;
}

const LoginFormContent = () => {
    const { isSubmitting } = useFormikContext<TLoginFormValues>();

    return (
        <div className={"h-full flex flex-col"}>
            <Row gutter={10}>
                <Col span={24}>
                    <ATextField name="email" label="Email" />
                </Col>
                <Col span={24}>
                    <APasswordField name="password" label="Password" />
                </Col>

                <Col span={24}>
                    <AButton type="primary" loading={isSubmitting} htmlType="submit" className={"w-full justify-center"}>
                        Login
                    </AButton>
                </Col>
            </Row>
        </div>
    );
}

const LoginForm = ({ initialValues, handleSubmit }: { initialValues: TLoginFormValues; handleSubmit: (values: TLoginFormValues) => Promise<void> }) => {

    return (
        <FormikForm initialValues={initialValues} onSubmit={handleSubmit}>
            <LoginFormContent />
        </FormikForm>
    )
}

export default LoginForm;