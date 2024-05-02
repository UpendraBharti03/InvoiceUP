import { useMemo } from 'react';
import { Col, DatePicker, Row, Typography } from 'antd';
import styled from 'styled-components';
import { useUiSettingsContext } from '../../settings';
import { Dayjs } from 'dayjs';

export interface IADatePickerInputProps {
    label?: string;
    isInvalid?: boolean;
    disabled?: boolean;
    preserveErrorSpace?: boolean;
    errorMessage?: string;

    [key: string]: any;
}

const StyledADatePicker: typeof DatePicker = styled(DatePicker)`
    width: 100%;

    .ant-picker-input .ant-picker-clear {
        display: ${({ allowClear }) => (allowClear ? 'block' : 'none')};
    }
` as unknown as typeof DatePicker;

export function ADatePickerInput({ label = '', isInvalid = false, errorMessage = '', preserveErrorSpace = true, showTime = false, ...props }: IADatePickerInputProps) {
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

    const handleChange = (val: Dayjs | null) => {
        if (val && val.toISOString) {
            const dateString = val.toISOString();
            return props.onChange(dateString);
        }
        props.onChange(val);
    };

    const status = isInvalid ? 'error' : undefined;

    return (
        <Row>
            {label && (
                <Col span={24}>
                    <Typography.Text>{label}</Typography.Text>
                </Col>
            )}
            <Col span={24}>
                <StyledADatePicker
                    {...(showTime ? { showTime: { format: 'hh:mm A' } } : {})}
                    format={showTime ? ['DD/MM/YYYY hh:mm A'] : ['DD/MM/YYYY']}
                    size={size}
                    {...props}
                    value={props.value}
                    onChange={handleChange}
                    status={status}
                />
            </Col>
            {preserveErrorSpace || isInvalid ? (
                <Col span={24}>
                    <Typography.Text type={'danger'}>{isInvalid ? errorMessage : ' '}</Typography.Text>
                </Col>
            ) : (
                <></>
            )}
        </Row>
    );
}

export default ADatePickerInput;
