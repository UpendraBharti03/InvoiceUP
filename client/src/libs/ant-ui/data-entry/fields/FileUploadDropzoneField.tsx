import { useField } from 'formik';
import { FileUploadDropzoneInput, IDropzoneFile, IFileUploadDropzoneInputProps } from '../inputs';

interface IFileUploadDropzoneFieldProps extends Omit<IFileUploadDropzoneInputProps, 'onChange' | 'value'> {
  name: string;
}

/**
 * File upload dropzone field
 * @param name
 * @param props - Use handleFileUpload prop for calling api - pass handleFileUpload function in it which is created in utils folder
 */
export const FileUploadDropzoneField = ({ name, ...props }: IFileUploadDropzoneFieldProps) => {
  const [{ value, onChange, ...field }, meta, helpers] = useField(name);

  const handleOnChange = (files: Array<IDropzoneFile>) => {
    helpers.setValue(files);
  };

  return (
    <>
      <FileUploadDropzoneInput value={value} onChange={handleOnChange} {...field} {...props} />
    </>
  );
};
