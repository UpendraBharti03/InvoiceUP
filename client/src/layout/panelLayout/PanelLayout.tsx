import React from 'react';
import { Breadcrumb, Flex, Layout, Menu, Spin, theme } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { Sidebar } from '@/layout/panelLayout/Sidebar';
import { useSelector } from 'react-redux';
import { selectIsAuthLoading, selectIsAuthenticated } from '@/redux/slices/authSlice';
import { redirect } from '@tanstack/react-router';
import PerfectScrollbar from 'react-perfect-scrollbar';

type TPanelLayoutProps = {
    children: React.ReactNode;
}

function PanelLayout({ children }: TPanelLayoutProps) {
    const { token: themeToken } = theme.useToken();
    const isAuthLoading = useSelector(selectIsAuthLoading);

    if (isAuthLoading) {
        return (
            <Flex className={"h-screen w-full bg-color-bg-layout"} justify={"center"} align={"center"}>
                <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
            </Flex>
        )
    }

    return (
        <Layout style={{ height: '100vh' }}>
            <Layout.Sider theme={"light"} collapsed={true}>
                <PerfectScrollbar options={{}} style={{ height: '100%' }}>
                    <Sidebar />
                </PerfectScrollbar>
            </Layout.Sider>
            <Layout>
                <PerfectScrollbar options={{}} style={{ height: '100%' }}>
                    <Layout.Content style={{ padding: themeToken?.padding }}>
                        {children}
                    </Layout.Content>
                </PerfectScrollbar>
            </Layout>
        </Layout>
    );
}

export default PanelLayout;
