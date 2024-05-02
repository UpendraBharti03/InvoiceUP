import { useField } from 'formik';
import { ACheckboxInput } from '../inputs';
import { useCallback } from 'react';

export const ACheckboxField = ({name, ...props}) => {
    const [field, meta, helpers] = useField(name);
    const isInvalid = meta.touched && !!meta.error;
    const handleChange = useCallback((value: boolean) => {
        helpers.setValue(value);
    }, []);
    return (
        <>
            <ACheckboxInput errorMessage={meta.error} isInvalid={isInvalid} {...field} {...props} onChange={handleChange} />
        </>
    );
};
