import React, { useEffect, useRef, useState } from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from "@ant-design/icons";
import { IUploadFile } from "@ui-helpers";

export const ADocFileViewer = ({ file }: { file: IUploadFile }) => {
  const [showDocViewer, setShowDocViewer] = useState(true);
  const [enableTimer, setEnableTimer] = useState(true);
  const [frameDataLoaded, setFrameDataLoaded] = useState(false);

  const refreshInterval = useRef();

  useEffect(() => {
    if (file && file?.url && enableTimer) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      refreshInterval.current = setInterval(() => {
        setShowDocViewer((prev) => !prev);
      }, 5000);
    }
    return () => {
      if (refreshInterval.current) {
        clearInterval(refreshInterval.current);
      }
    };
  }, [file, enableTimer]);

  return (
    <>
      {!file?.url || !showDocViewer ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: 756 }}>
          <Spin indicator={<LoadingOutlined />} spinning={!file?.url || !showDocViewer}>
            <span className="visually-hidden">Loading...</span>
          </Spin>
        </div>
      ) : (
        <div className="position-relative">
          <iframe
            src={`https://docs.google.com/viewer?embedded=true&url=${encodeURIComponent(file?.url)}`}
            width="100%"
            height="750"
            onLoad={() => {
              setFrameDataLoaded(true);
              setEnableTimer(false);
            }}
          />
          {!frameDataLoaded && (
            <div className="position-absolute" style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)', zIndex: 2 }}>
              <Spin indicator={<LoadingOutlined />} spinning={!frameDataLoaded}>
                <span className="visually-hidden">Loading...</span>
              </Spin>
            </div>
          )}
        </div>
      )}
    </>
  );
};
