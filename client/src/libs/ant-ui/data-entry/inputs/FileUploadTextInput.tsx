import { ReactNode, useMemo } from 'react';
import { Col, Popover, Row, Spin, theme, Typography } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { ATextInput } from './TextInput';
import { useUiSettingsContext } from '../../settings';
import { AFileUploadInput, IACommonFileUploadProps } from './FileUploadInput';

export interface IAFileUploadTextInputProps extends IACommonFileUploadProps {
    label?: string | ReactNode;
    placeholder?: string;
}

/**
 * Renamed FileUploadInputButton to FileUploadTextInput
 * @param isInvalid
 * @param errorMessage
 * @param value
 * @param onChange
 * @param placeholder
 * @param allowedFileTypes
 * @param label
 * @param props
 */

export function AFileUploadTextInput({
    isInvalid = false,
    errorMessage = '',
    preserveErrorSpace = true,
    value,
    onChange,
    label = '',
    placeholder = '',
    ...props
}: IAFileUploadTextInputProps) {
    const { token: themeToken } = theme.useToken();
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
        <>
            {value?.url ? (
                <Popover
                    trigger="hover"
                    content={
                        <div>
                            <img width="200px" src={value?.url} alt="preview" />
                        </div>
                    }
                >
                    <Row>
                        {label && (
                            <Col span={24}>
                                <Typography.Text>{label}</Typography.Text>
                            </Col>
                        )}
                        <AFileUploadInput value={value} onChange={onChange} {...props}>
                            {({ value, isLoading }) => {
                                return (
                                    <Col span={24}>
                                        <div>
                                            {isLoading && (
                                                <Spin style={{ marginTop: themeToken?.margin, marginBottom: themeToken?.margin }} indicator={<LoadingOutlined style={{ fontSize: themeToken?.size }} spin />}>
                                                    <span className="visually-hidden">Loading...</span>
                                                </Spin>
                                            )}
                                            <ATextInput preserveErrorSpace={false} onClick={() => {}} value={value?.originalName ? value?.originalName : placeholder} />
                                        </div>
                                    </Col>
                                );
                            }}
                        </AFileUploadInput>
                        {preserveErrorSpace || isInvalid ? (
                            <Col span={24} className="text-end">
                                <Typography.Text style={{ color: themeToken?.colorError }}>{isInvalid ? errorMessage : ' '}</Typography.Text>
                            </Col>
                        ) : (
                            <></>
                        )}
                    </Row>
                </Popover>
            ) : (
                <Row>
                    {label && (
                        <Col span={24}>
                            <Typography.Text>{label}</Typography.Text>
                        </Col>
                    )}
                    <AFileUploadInput value={value} onChange={onChange} {...props}>
                        {({ value, isLoading }) => {
                            return (
                                <Col span={24}>
                                    <div>
                                        {isLoading && (
                                            <Spin style={{ marginTop: themeToken?.margin, marginBottom: themeToken?.margin }} indicator={<LoadingOutlined style={{ fontSize: themeToken?.size }} spin />}>
                                                <span className="visually-hidden">Loading...</span>
                                            </Spin>
                                        )}

                                        <ATextInput preserveErrorSpace={false} onClick={() => {}} value={value?.originalName} placeholder={placeholder} />
                                    </div>
                                </Col>
                            );
                        }}
                    </AFileUploadInput>
                    {preserveErrorSpace || isInvalid ? (
                        <Col span={24} className="text-end">
                            <Typography.Text style={{ color: themeToken?.colorError }}>{isInvalid ? errorMessage : ' '}</Typography.Text>
                        </Col>
                    ) : (
                        <></>
                    )}
                </Row>
            )}
        </>
    );
}
