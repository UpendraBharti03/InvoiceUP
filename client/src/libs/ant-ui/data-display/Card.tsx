import React, { useMemo } from 'react';
import { Card, CardProps } from 'antd';
import { useUiSettingsContext } from '../settings';
import styled from 'styled-components';

interface IACardProps extends CardProps {
    cardRef?: React.RefObject<HTMLDivElement>;
    variant?: 'default' | 'borderless';
}

const StyledCard = styled(Card)`
    background-color: #fff;
    border: none;
`;
export const ACard = ({ variant = 'default', cardRef, ...props }: IACardProps) => {
    const { size: configSize } = useUiSettingsContext();
    const size = useMemo(() => {
        switch (configSize) {
            case 'large':
            case 'medium': {
                return 'default';
            }
            default: {
                return configSize;
            }
        }
    }, [configSize]);

    if (variant === 'borderless') {
        return <StyledCard ref={cardRef} size={size} {...props} />;
    }
    return <Card ref={cardRef} size={size} {...props} />;
};
