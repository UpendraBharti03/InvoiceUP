import React, { useMemo } from 'react';
import { Steps } from 'antd';
import { useUiSettingsContext } from '../settings';
import styled from 'styled-components';
import { StepsProps } from 'antd/es/steps';

const AStyledSteps: React.FC<StepsProps> = styled(Steps)``;

export function ASteps(props: StepsProps) {
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
    return <AStyledSteps size={size} {...props} />;
}
