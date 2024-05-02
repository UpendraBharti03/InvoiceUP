import React, { useMemo } from 'react';
import { Collapse, CollapseProps } from 'antd';
import { useUiSettingsContext } from '../settings';

interface IACollapseProps extends CollapseProps {
    collapseRef?: React.RefObject<HTMLDivElement>;
}

export const ACollapse = ({ collapseRef, ...props }: IACollapseProps) => {
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
    return <Collapse ref={collapseRef} size={size} {...props} />;
};
