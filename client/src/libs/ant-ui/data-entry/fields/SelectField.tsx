import { useField } from 'formik';
import { ASelectInput, IASelectInputProps } from '../inputs';

interface IASelectFieldProps extends Omit<IASelectInputProps, 'onChange' | 'value' | 'isInvalid' | 'errorMessage'> {
    name: string;
}

/**
 * Renders a custom select field component.
 *
 * @param name - The name of the field.
 * @param props - Additional props to pass to the select field component.
 * @return The rendered select field component.
 */
export const ASelectField = ({ name, ...props }: IASelectFieldProps) => {
    const [{ value, onChange, ...field }, meta, helpers] = useField(name);

    const isInvalid = meta.touched && !!meta.error;

    const handleChange = (value: any) => {
        helpers.setValue(value);
    };

    return (
        <>
            <ASelectInput value={value} onChange={handleChange} isInvalid={isInvalid} errorMessage={meta.error} {...field} {...props} />
        </>
    );
};
