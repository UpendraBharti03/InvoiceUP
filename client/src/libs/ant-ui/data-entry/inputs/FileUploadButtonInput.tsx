import { memo, ReactNode } from 'react';
import styled from 'styled-components';
import { AFileUploadInput, IACommonFileUploadProps } from './FileUploadInput';
import { AButton } from '../../buttons';

const UploadInput = styled.div`
    .uploadInput input {
        cursor: pointer !important;
    }
`;

export interface IAFileUploadButtonInputProps extends IACommonFileUploadProps {
    children?: ReactNode | string;
    className?: string;
    type?: 'text' | 'primary' | 'link' | 'default' | 'dashed';
    icon?: ReactNode;
}

/**
 * File upload button input
 * @param children
 * @param value
 * @param onChange
 * @param type
 * @param className
 * @param icon
 * @param props
 */
const AFileUploadButtonInputComponent = ({ children, value, onChange, type = 'primary', className = '', icon = '', ...props }: IAFileUploadButtonInputProps) => {
    // const size = useSelector(selectConfigSize)
    // console.log("-> size", size);
    return (
        <>
            <UploadInput>
                <div className="uploadInput">
                    <AFileUploadInput value={value} onChange={onChange} {...props}>
                        {({ isLoading }: { isLoading: boolean }) => (
                            <>
                                <div>
                                    <AButton className={className} type={type} icon={icon} loading={isLoading} disabled={isLoading} style={{ cursor: 'pointer' }}>
                                        {children}
                                    </AButton>
                                </div>
                            </>
                        )}
                    </AFileUploadInput>
                </div>
            </UploadInput>
        </>
    );
};

/**
 * Renamed FileUploadButton to FileUploadButtonInput
 */
export const AFileUploadButtonInput = memo(AFileUploadButtonInputComponent);
