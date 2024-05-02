import { useMemo } from 'react';
import { Col, Row, Switch, SwitchProps, Typography } from 'antd';
import { useUiSettingsContext } from '../../settings';

export interface IASwitchInputProps extends SwitchProps {
    label?: string;
    isInvalid?: boolean;
    preserveErrorSpace?: boolean;
    errorMessage?: string;
}

export const ASwitchInput = ({ label = '', isInvalid = false, errorMessage = '', preserveErrorSpace = true, ...props }: IASwitchInputProps) => {
    const { size: configSize } = useUiSettingsContext();
    const size = useMemo(() => {
        switch (configSize) {
            case 'small': {
                return 'small';
            }
            default: {
                return 'default';
            }
        }
    }, [configSize]);

    return (
        <Row>
            {label && (
                <Col span={24}>
                    <Typography.Text>{label}</Typography.Text>
                </Col>
            )}
            <Col span={24}>
                <Switch size={size} {...props} />
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
};
