import { Drawer } from 'antd';
import { ReactNode } from 'react';
import styled from 'styled-components';

interface IDrawerProps {
    closeSidebar: (() => void) | undefined;
    SidebarOpen: boolean | undefined;
    children: ReactNode;
    title?: string;
    drawerSize?: 'default' | 'large';
}

const StyledDrawer: typeof Drawer = styled(Drawer)`
        .ant-drawer-header {
            padding: ${(props) => props.theme.paddingXXS}px;
        }

        .ant-drawer-body {
            padding: ${(props) => props.theme.paddingSM}px;
            max-height: calc(100vh - 90px);
        }

        border-radius: ${(props) => props.theme.borderRadiusSM}px;
`;

StyledDrawer.defaultProps = {
    contentWrapperStyle: {
        top: 'auto',
        margin: 10,
    },
};

export const AMiniDrawer = (props: IDrawerProps) => {


    return (
        <StyledDrawer size={props?.drawerSize} destroyOnClose mask={false} className="asdsa" title={props.title} placement={'right'} onClose={props.closeSidebar} open={props.SidebarOpen}>
            {props.children}
        </StyledDrawer>
    );
};
