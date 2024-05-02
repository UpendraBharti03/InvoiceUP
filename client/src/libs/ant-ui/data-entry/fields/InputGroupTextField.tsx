import { useField } from 'formik';
import { AInputGroupTextInput, IAInputGroupTextInputProps } from '../inputs';

interface IAInputGroupTextFieldProps extends IAInputGroupTextInputProps {
    name: string;
}

/**
 * Input group text field
 * @param name
 * @param props
 */
export const AInputGroupTextField = ({ name, ...props }: IAInputGroupTextFieldProps) => {
    const [field, meta] = useField(name);
    const isInvalid = meta.touched && !!meta.error;
    return <AInputGroupTextInput isInvalid={isInvalid} errorMessage={meta.error} {...field} {...props} />;
};
