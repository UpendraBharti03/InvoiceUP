import React, { RefObject, useMemo } from 'react';

import { Col, Input, InputProps, InputRef, Row, theme, Typography } from "antd";
import styled from 'styled-components';
import { useUiSettingsContext } from '../../settings';

export interface IATextInputProps extends Omit<InputProps, 'size'> {
    label?: string;
    isInvalid?: boolean;
    preserveErrorSpace?: boolean;
    errorMessage?: string;
    inputRef?: RefObject<InputRef>;
}

const StyledInput = styled(Input)`
    width: 100%;
`;

const ATextInputComponent = ({ label = '', isInvalid = false, errorMessage = '', preserveErrorSpace = true, ...props }: IATextInputProps) => {
    const {token: themeToken} = theme.useToken();
    const { size: configSize } = useUiSettingsContext();
    const size = useMemo(() => {
        switch (configSize) {
            case 'medium': {
                return 'middle';
            }
            default: {
                return configSize;
            }
        }
    }, [configSize]);

    const status = isInvalid ? "error" : undefined;

    return (
        <Row>
            {label && (
                <Col span={24}>
                    <Typography.Text>{label}</Typography.Text>
                </Col>
            )}
            <Col span={24}>
                <StyledInput ref={props?.inputRef} status={status} size={size} {...(props?.type === "number" ? {step: "any"} : {})} {...props} />
            </Col>
            {preserveErrorSpace || isInvalid ? (
                <Col span={24} className="text-end">
                    <Typography.Text style={{ color: themeToken?.colorError }}>{isInvalid ? errorMessage : ' '}</Typography.Text>
                </Col>
            ) : (
                <></>
            )}
        </Row>
    );
};

export const ATextInput = React.memo(ATextInputComponent);
