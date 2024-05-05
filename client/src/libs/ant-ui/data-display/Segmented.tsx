import { useMemo } from 'react';
import { Segmented, SegmentedProps } from 'antd';
import { useUiSettingsContext } from '../settings';

export const ASegmented = (props: Omit<SegmentedProps, 'ref'>) => {
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
    return <Segmented size={size} {...props} />;
};
