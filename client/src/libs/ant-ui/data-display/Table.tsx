import { useMemo } from 'react';
import { Table, TableProps } from 'antd';
import { useUiSettingsContext } from '../settings';

export const ATable = (props: TableProps) => {
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
    return <Table size={size} {...props} />;
};
