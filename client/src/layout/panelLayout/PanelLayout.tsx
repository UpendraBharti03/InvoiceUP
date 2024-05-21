import React from 'react';

type TPanelLayoutProps = {
    children: React.ReactNode;
}

function PanelLayout({ children }: TPanelLayoutProps) {
    return <>{children}</>;
}

export default PanelLayout;
