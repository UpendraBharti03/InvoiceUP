import { useField } from 'formik';
import { useMemo } from 'react';
import dayjs from 'dayjs';
import ADatePickerInput, { IADatePickerInputProps } from '../inputs/DatePickerInput';

export interface IADatePickerFieldProps extends IADatePickerInputProps {
    name: string;
}

export const ADatePickerField = (props: IADatePickerFieldProps) => {
    const [field, meta, helpers] = useField(props.name);
    const isInvalid = meta.touched && !!meta.error;
    const dayJsValue = useMemo(() => (field.value ? dayjs(field.value) : null), [field.value]);
    const handleChange = (value: string) => {
        helpers.setValue(value);
    };
    return <ADatePickerInput errorMessage={meta.error} isInvalid={isInvalid} {...field} onChange={handleChange} value={dayJsValue} {...props} />;
};
export default ADatePickerField;
