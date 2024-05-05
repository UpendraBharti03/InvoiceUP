import { useMemo } from 'react';
import { Tabs, TabsProps } from 'antd';
import { useUiSettingsContext } from '../settings';

export const ATabs = (props: TabsProps) => {
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
    return <Tabs size={size} {...props} />;
};
