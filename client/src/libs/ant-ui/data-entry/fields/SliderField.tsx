import { useField } from 'formik';
import { ASliderInput, IASliderInputProps } from '../inputs';

interface IASliderFieldProps extends Omit<IASliderInputProps, 'value' | 'onChange' | 'isInvalid' | 'errorMessage'> {
    name: string;
}

export const ASliderField = ({ name, ...props }: IASliderFieldProps) => {
    const [field, meta, helpers] = useField(name);
    const isInvalid = meta.touched && !!meta.error;

    const handleChange = (value: number) => {
        helpers.setValue(String(value));
    }

    return <ASliderInput isInvalid={isInvalid} errorMessage={meta?.error} {...field} onChange={handleChange} {...props} />;
};
