import React from 'react';
import { Form, Formik, FormikConfig, FormikProps } from 'formik';

interface IFormProps extends FormikConfig<any> {
    children: React.ReactNode | ((formik: FormikProps<any>) => React.ReactNode);
}

/**
 * All form fields must be the children of FormikForm to use formik
 * @param children - children can be type of function or type of react node
 *                 - use children as function when need formikProps otherwise can use formik context to all FormikForm children
 * @param props - initialValue and onSubmit are compulsory, use validate prop for validation and can use all formik props
 */
export function FormikForm({ children, ...props }: IFormProps) {
    if (typeof children === 'function') {
        return <Formik {...props}>{(formik: FormikProps<any>) => <Form style={{ height: '100%' }}>{children(formik)}</Form>}</Formik>;
    }

    return (
        <Formik {...props}>
            <Form style={{ height: '100%' }}>{children}</Form>
        </Formik>
    );
}
