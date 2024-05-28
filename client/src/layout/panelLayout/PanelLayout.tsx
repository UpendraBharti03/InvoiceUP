import React from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';

type TPanelLayoutProps = {
    children: React.ReactNode;
}

function PanelLayout({ children }: TPanelLayoutProps) {
    return <>
    <Layout style={{ minHeight: '100vh' }}>
    <Layout.Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
    </Layout.Sider>
    <Layout>
    <Layout.Content style={{ margin: '0 16px' }}></Layout.Content>
    {children}
    </Layout>
    </Layout>
    </>;
}

export default PanelLayout;
