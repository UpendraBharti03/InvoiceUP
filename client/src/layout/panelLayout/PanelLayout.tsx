import React from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Sidebar } from '@/layout/panelLayout/Sidebar';

type TPanelLayoutProps = {
    children: React.ReactNode;
}

function PanelLayout({ children }: TPanelLayoutProps) {
    const {token: themeToken} = theme.useToken();
    return <>
        <Layout style={{ minHeight: '100vh' }}>
            <Layout.Sider theme={"light"} collapsible collapsed={false}>
                <Sidebar />
            </Layout.Sider>
            <Layout>
                <Layout.Content style={{ padding: themeToken?.padding }}>
                    {children}
                </Layout.Content>
            </Layout>
        </Layout>
    </>;
}

export default PanelLayout;
