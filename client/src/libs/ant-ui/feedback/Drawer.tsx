import { useMemo } from 'react';
import { Drawer, DrawerProps } from 'antd';
import { useUiSettingsContext } from '../settings';

export const ADrawer = (props: DrawerProps) => {
    const { size: configSize } = useUiSettingsContext();
    const size = useMemo(() => {
        switch (configSize) {
            case 'large': {
                return 'large';
            }
            default: {
                return 'default';
            }
        }
    }, [configSize]);

    return <Drawer size={size} {...props}></Drawer>;
};
