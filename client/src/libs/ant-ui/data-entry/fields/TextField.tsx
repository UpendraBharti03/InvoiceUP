import { useField } from 'formik';
import { ATextInput, IATextInputProps } from '../inputs';

export interface ITextFieldProps extends Omit<IATextInputProps, 'onChange' | 'value' | 'isInvalid' | 'errorMessage' > {
    name: string;
}

export const ATextField = ({ name, ...props }: ITextFieldProps) => {
    const [field, meta] = useField(name);
    const isInvalid = meta.touched && !!meta.error;

    return <ATextInput errorMessage={meta.error} isInvalid={isInvalid} {...field} {...props} />;
};
