import { Col, Row, Slider, theme, Typography } from 'antd';
import { SliderSingleProps } from 'antd/es/slider';
import styled from 'styled-components';

export interface IASliderInputProps extends SliderSingleProps {
    label?: string;
    isInvalid?: boolean;
    preserveErrorSpace?: boolean;
    errorMessage?: string;
}

const StyledSlider = styled(Slider)`
    width: 100%;
`;

export const ASliderInput = ({ label = '', isInvalid, errorMessage, preserveErrorSpace, ...props }: IASliderInputProps) => {
    const { token: themeToken } = theme.useToken();

    return (
        <Row>
            {label && (
                <Col span={24}>
                    <Typography.Text>{label}</Typography.Text>
                </Col>
            )}
            <Col span={24}>
                <StyledSlider value={typeof props?.value === 'string' ? Number(props?.value) : props?.value} {...props} />
            </Col>
            {preserveErrorSpace || isInvalid ? (
                <Col span={24} className="text-end">
                    <Typography.Text style={{ color: themeToken.colorError }}>{isInvalid ? errorMessage : ' '}</Typography.Text>
                </Col>
            ) : (
                <></>
            )}
        </Row>
    );
};
