import React from 'react';
import { Breadcrumb, Layout, Menu, Spin, theme } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { Sidebar } from '@/layout/panelLayout/Sidebar';
import { useSelector } from 'react-redux';
import { selectIsAuthLoading, selectIsAuthenticated } from '@/redux/slices/authSlice';
import { redirect } from '@tanstack/react-router';

type TPanelLayoutProps = {
    children: React.ReactNode;
}

function PanelLayout({ children }: TPanelLayoutProps) {
    const { token: themeToken } = theme.useToken();
    const isAuthLoading = useSelector(selectIsAuthLoading);

    if (isAuthLoading) {
        return (
            <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
        )
    }

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Layout.Sider theme={"light"} collapsed={true}>
                <Sidebar />
            </Layout.Sider>
            <Layout>
                <Layout.Content style={{ padding: themeToken?.padding }}>
                    {children}
                </Layout.Content>
            </Layout>
        </Layout>
    );
}

export default PanelLayout;
