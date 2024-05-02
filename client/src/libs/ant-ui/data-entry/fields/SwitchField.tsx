import { useField } from 'formik';
import { ASwitchInput, IASwitchInputProps } from '../inputs';

interface IASwitchFieldProps extends Omit<IASwitchInputProps, 'onChange' | 'value'> {
    name: string;
}

export const ASwitchField = (props: IASwitchFieldProps) => {
    const [{ onChange, value, ...field }, meta, helpers] = useField(props.name);

    const isInvalid = meta.touched && !!meta.error;

    return <ASwitchInput checked={value} errorMessage={meta.error} isInvalid={isInvalid} onChange={(isChecked) => helpers.setValue(isChecked)} {...field} {...props} />;
};
