import React from 'react';
import { Checkbox, CheckboxProps, Col, Row, theme, Typography } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';

export interface IACheckboxInputProps extends Omit<CheckboxProps, 'checked' | 'onChange'> {
    value: boolean;
    onChange: (value: boolean) => void;
    label?: string;
    errorMessage?: string;
    isInvalid?: boolean;
    preserveErrorSpace?: boolean;
}

function ACheckboxInputComponent({ value, onChange, label, isInvalid, preserveErrorSpace = true, errorMessage, ...props }: IACheckboxInputProps) {
    const { token: themeToken } = theme.useToken();
    const handleChange = (e: CheckboxChangeEvent) => {
        onChange(e.target.checked);
    };

    return (
        <>
            <Row>
                <Col xs={24}>
                    <Checkbox checked={value} onChange={handleChange} {...props}>
                        {label && label}
                    </Checkbox>
                </Col>
                {!preserveErrorSpace || isInvalid ? (
                    <Col xs={24}>
                        <Typography.Text id="helpBlock" style={{ color: themeToken?.colorError }}>
                            {!preserveErrorSpace || isInvalid ? errorMessage : ' '}
                        </Typography.Text>
                    </Col>
                ) : (
                    <></>
                )}
            </Row>
        </>
    );
}

export const ACheckboxInput = React.memo(ACheckboxInputComponent);
