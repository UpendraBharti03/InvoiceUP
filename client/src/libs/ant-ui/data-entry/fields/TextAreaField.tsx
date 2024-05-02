import { useField } from "formik";
import { ATextAreaInput, IATextAreaInput } from "../inputs";

interface IATextAreaFieldProps extends IATextAreaInput {
    name: string;
}

export const ATextAreaField = ({ name, ...props }: IATextAreaFieldProps) => {
    const [field, meta] = useField(name);
    const isInvalid = meta.touched && !!meta.error;
    return (
        <>
            <ATextAreaInput errorMessage={meta.error} isInvalid={isInvalid} {...field} {...props} />
        </>
    );
};