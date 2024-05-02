import { useField } from 'formik';
import { APasswordInput, IAPasswordInputProps } from '../inputs/PasswordInput';

interface IAPasswordFieldProps extends IAPasswordInputProps {
    name: string;
}

export const APasswordField = ({ name, ...props }: IAPasswordFieldProps) => {
    const [field, meta, helpers] = useField(name);
    const isInvalid = meta.touched && !!meta.error;
    return (
        <>
            <APasswordInput isInvalid={isInvalid} errorMessage={meta.error} {...field} {...props} />
        </>
    );
};
