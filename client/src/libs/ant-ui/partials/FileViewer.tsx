import { IUploadFile } from '@ui-helpers';
import { ADocFileViewer } from './DocFileViewer';
import { Empty, Spin } from 'antd';
import React from 'react';

export const AFileViewer = ({ file, loading = false, width = '100%', height = 750 }: { file: IUploadFile; loading?: boolean; width?: string | number; height?: string | number }) => {
    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height }}>
                <Spin spinning={loading}>
                    <span className="visually-hidden">Loading...</span>
                </Spin>
            </div>
        );
    }

    // Handle pdf view with html object
    if (file?.url && file?.mimeType === 'application/pdf') {
        return <object data={file?.url} width={width} height={height}></object>;
    }

    // Use Google Docs viewer for docx and other formats.
    if (file?.url) {
        return <ADocFileViewer file={file} />;
    }

    return <Empty description="File not found" />;
};
