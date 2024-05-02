import { memo, useMemo } from "react";
import { Input, InputProps, theme, Typography } from 'antd';
import { useUiSettingsContext } from '../../settings';

export interface IAInputGroupTextInputProps extends InputProps {
    label?: string;
    preserveErrorSpace?: boolean;
    isInvalid?: boolean;
    errorMessage?: string;
}

/**
 * Input group text input
 * @param type
 * @param label
 * @param preserveErrorSpace
 * @param isInvalid
 * @param errorMessage
 * @param props
 */
function AInputGroupTextInputComponent({ type = 'text', label = '', preserveErrorSpace = true, isInvalid = false, errorMessage = '', ...props }: IAInputGroupTextInputProps) {
    const { size: configSize } = useUiSettingsContext();
    const { token: themeToken } = theme.useToken();
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
            {label && (
                <div>
                    <Typography.Text>{label}</Typography.Text>
                </div>
            )}

            <Input size={size} type={type} {...props} />

            {preserveErrorSpace || isInvalid ? (
                <Typography.Text style={{ color: themeToken.colorError }}>{isInvalid ? (typeof errorMessage === 'object' ? Object.values(errorMessage)?.join(', ') : errorMessage) : ' '}</Typography.Text>
            ) : (
                <></>
            )}
        </>
    );
}

export const AInputGroupTextInput = memo(AInputGroupTextInputComponent);
