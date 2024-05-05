import { useMemo } from 'react';
import { Modal, ModalProps } from 'antd';
import { useUiSettingsContext } from '../settings';

export const AModal = (props: ModalProps) => {
    const { size: configSize } = useUiSettingsContext();
    const size = useMemo(() => {
        console.log(configSize);
        switch (configSize) {
            case 'large':
                return 992;
            case 'medium': {
                return 768;
            }
            default: {
                return 576;
            }
        }
    }, [configSize]);

    //Size prop not available in ANT Modal
    return <Modal width={size} {...props} />;
};
