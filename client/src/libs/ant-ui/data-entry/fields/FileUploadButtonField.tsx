import { useField } from 'formik';
import { IUploadFile } from '@ui-helpers';
import { AFileUploadButtonInput, IAFileUploadButtonInputProps } from '../inputs';

interface IAFileUploadButtonFieldProps extends Omit<IAFileUploadButtonInputProps, 'onChange' | 'value'> {
    name: string;
}

/**
 * File upload button field
 * @param name
 * @param children
 * @param props
 */
export function AFileUploadButtonField({ name, children, ...props }: IAFileUploadButtonFieldProps) {
    const [{ onChange, ...field }, meta, helpers] = useField(name);
    const isInvalid = meta.touched && !!meta.error;

    const handleChangeValue = (value: File | IUploadFile) => {
        helpers.setValue(value);
    };

    return (
        <AFileUploadButtonInput errorMessage={meta.error} isInvalid={isInvalid} onChange={handleChangeValue} {...field} {...props}>
            {children}
        </AFileUploadButtonInput>
    );
}
