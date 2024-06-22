// import dynamic from 'next/dynamic';
import {HTMLAttributes, memo, ReactNode, useMemo, useState} from 'react';
import styled from 'styled-components';
import {toast} from "react-toastify";
import {IUploadFile, IUploadFileResult} from '@ui-helpers';

// const ImageEditor = dynamic(() => import('../../partials/ImageEditor'), { ssr: false });

const StyledFileUploadInputContainer = styled.div`
    position: relative;
    width: 100%;
`;

export interface IACommonFileUploadProps extends Omit<HTMLAttributes<any>, 'onChange' | 'children'> {
    isInvalid?: boolean;
    errorMessage?: string;
    /**
     * Preserves error message space
     */
    preserveErrorSpace?: boolean;
    value?: IUploadFile;
    onChange: (file: File | IUploadFile) => void;
    shadow?: boolean;
    multiple?: boolean;
    /**
     * Tells what type of file extensions are allowed
     */
    allowedFileTypes?: string[];
    /**
     * Shows error message as toast error when files are not allowed or file size is more than max limit of file
     */
    typeErrorMessage?: string;
    /**
     * Maximum size of file allowed to upload
     */
    maxFileSize?: number;
    /**
     * File uploading with api or not
     */
    useFileUploadApi?: boolean;
    /**
     * File upload function api hitting
     * @param file
     */
    handleFileUpload?: (file: File) => Promise<IUploadFileResult>;
    /**
     * Aspect Ratio of image
     */
    aspect?: number;
}

interface IAFileUploadInputProps extends IACommonFileUploadProps {
    children: ({value, handleDelete, isInvalid, errorMessage, isLoading}: {
        value?: IUploadFile;
        handleDelete?: () => void;
        isInvalid?: boolean;
        errorMessage?: string;
        isLoading: boolean
    }) => ReactNode;
}

/**
 * Custom file upload input
 * @param isInvalid
 * @param errorMessage
 * @param children
 * @param value
 * @param onChange
 * @param multiple
 * @param allowedFileTypes
 * @param typeErrorMessage
 * @param maxFileSize
 * @param useFileUploadApi
 * @param handleFileUpload
 * @param aspect
 */
function AFileUploadInputComponent({
                                       isInvalid = false,
                                       errorMessage = '',
                                       children,
                                       value,
                                       onChange,
                                       multiple = false,
                                       allowedFileTypes,
                                       typeErrorMessage = 'Invalid file type',
                                       maxFileSize = 5242880,
                                       useFileUploadApi = true,
                                       handleFileUpload,
                                       aspect = 1,
                                   }: IAFileUploadInputProps) {
    const [isLoading, setIsLoading] = useState(false);

    const handleDelete = () => {
        // @ts-ignore
        onChange();
    };

    const accepts = useMemo(() => {
        if (allowedFileTypes && Array.isArray(allowedFileTypes) && allowedFileTypes.length > 0) {
            return allowedFileTypes.toString();
        }
        return '*/*';
    }, [allowedFileTypes]);

    const saveFile = async (file: File) => {
        setIsLoading(true);
        if (useFileUploadApi && handleFileUpload) {
            const uploadFile = await handleFileUpload(file);
            /**
             * Used handleFileUpload prop because callApi using env variables indirectly
             * handleFileUpload function like this -
             * const handleFileUpload = (file: File) => {
             *      return callApi<IUploadFileResult>({
             *          requestFunction: uploadFileRequest(file),
             *          showToastOnSuccess: false,
             *      });
             * }
             */
            if (!uploadFile?.error && 'file' in uploadFile && uploadFile.file) {
                await onChange(uploadFile.file);
                console.log(uploadFile);
            }
        } else {
            await onChange(file);
        }
        setIsLoading(false);
    };

    return (
        <>
            <StyledFileUploadInputContainer>
                {!isLoading && (
                    <input
                        disabled={isLoading}
                        accept={accepts}
                        multiple={multiple}
                        // className="form-control"
                        style={{
                            width: '100%',
                            height: '100%',
                            position: 'absolute',
                            opacity: 0,
                            left: '0px',
                            zIndex: 10,
                        }}
                        type="file"
                        onChange={async (e) => {
                            const files = e?.target?.files ?? [];
                            if (!multiple) {
                                const file = files?.[0];
                                if (!file) {
                                    return;
                                }
                                if (allowedFileTypes && Array.isArray(allowedFileTypes) && allowedFileTypes.length > 0) {
                                    if (!allowedFileTypes.includes(file.type)) {
                                        return toast.error(typeErrorMessage);
                                    }
                                }
                                if (file.size >= maxFileSize) {
                                    return toast.error(`file size should be less than ${maxFileSize / 1048576}MB`);
                                }
                                // if (file.type && file.type.includes('image')) {
                                //     console.log('-> file', file);
                                //
                                //     setImage(file);
                                // } else {
                                saveFile(file);
                                // }
                            }
                        }}
                    />
                )}

                {children({value, handleDelete, isInvalid, errorMessage, isLoading})}
            </StyledFileUploadInputContainer>
        </>
    );
}

export const AFileUploadInput = memo(AFileUploadInputComponent);
