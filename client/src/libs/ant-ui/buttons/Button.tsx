import React, { useMemo } from 'react';
import { Button } from 'antd';
import { ButtonProps } from 'antd/es/button/button';
import Group from 'antd/es/button/button-group';
import { useUiSettingsContext } from '../settings';
import styled from 'styled-components';

export type IButtonProps = React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLElement>> & {
    Group: typeof Group;
};

const StyledButton : typeof Button = styled(Button)`
    display: flex;
    align-items: center;
    .ant-btn-icon {
        margin-left: auto;
        margin-right: auto;
    }
`

export function AButton(props: ButtonProps) {
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
    return <StyledButton size={size} {...props} />;
}
