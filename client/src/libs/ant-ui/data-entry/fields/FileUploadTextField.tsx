import { useField } from 'formik';
import { IUploadFile } from '@ui-helpers';
import { AFileUploadTextInput, IAFileUploadTextInputProps } from '../inputs';

interface IAFileUploadTextFieldProps extends Omit<IAFileUploadTextInputProps, 'onChange' | 'value'> {
    name: string;
}

/**
 * Renamed FileUploadField to FileUploadTextFiled
 * @param name
 * @param props
 */
export function AFileUploadTextField({ name, ...props }: IAFileUploadTextFieldProps) {
    const [{ onChange, ...field }, meta, helpers] = useField(name);
    const isInvalid = meta.touched && !!meta.error;

    const handleChangeValue = (value: File | IUploadFile) => {
        helpers.setValue(value);
    };

    return <AFileUploadTextInput errorMessage={meta.error} isInvalid={isInvalid} onChange={handleChangeValue} {...field} {...props} />;
}
