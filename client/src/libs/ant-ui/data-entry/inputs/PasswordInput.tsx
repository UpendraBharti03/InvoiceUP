import { Col, Input, Row, theme, Typography } from "antd";
import { useMemo } from 'react';
import { useUiSettingsContext } from '../../settings';
import { PasswordProps } from 'antd/es/input/Password';
import styled from "styled-components";

export interface IAPasswordInputProps extends PasswordProps {
    label?: string;
    isInvalid?: boolean;
    errorMessage?: string;
    preserveErrorSpace?: boolean;
}

const StyledPasswordInput = styled(Input.Password)`
    width: 100%;
`;

export function APasswordInput({ label = '', isInvalid = false, errorMessage = '', preserveErrorSpace = true, ...props }: IAPasswordInputProps) {
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

    return (
        <Row>
            {label && (
                <Col xs={24}>
                    <Typography.Text>{label}</Typography.Text>
                </Col>
            )}
            <Col xs={24}>
                <StyledPasswordInput style={{ border: `1px solid ${isInvalid ? themeToken?.colorErrorBorder : themeToken?.colorBorder}` }} size={size} {...props} />
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
}
