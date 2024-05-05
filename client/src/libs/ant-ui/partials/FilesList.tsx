import { Avatar, List } from 'antd';
import { GoFileZip, GoVideo } from 'react-icons/go';
import { MdOutlineAudiotrack } from 'react-icons/md';
import { SiAdobeacrobatreader, SiSvg } from 'react-icons/si';
import { PiFileDocLight, PiMicrosoftExcelLogoLight } from 'react-icons/pi';
import { BsFileEarmarkText } from 'react-icons/bs';
import { TbFileUnknown } from 'react-icons/tb';
import { HiOutlineFolderDownload } from 'react-icons/hi';
import { downloadFile, IUploadFile } from '@ui-helpers';
import { AButton } from '../buttons';

interface IAFilesListProps {
    files: IUploadFile[];
}

const mimeTypeDescription = (file: IUploadFile) => {
    if (file?.mimeType === 'application/pdf') {
        return 'PDF';
    }
    if (file?.mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        return 'Word';
    }
    if (file?.mimeType === 'application/vnd.ms-excel' || file?.mimeType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        return 'Excel';
    }
    // if (file?.mimeType === 'image/svg+xml') {
    //     return 'Svg';
    // }
    if (file?.mimeType.includes('text')) {
        return 'Text';
    }
    if (file?.mimeType?.includes('image')) {
        return 'Image';
    }
    if (file?.mimeType?.includes('video')) {
        return 'Video';
    }
    if (file?.mimeType?.includes('audio')) {
        return 'Audio';
    }
    if (file?.mimeType?.includes('zip')) {
        return 'Zip';
    }
    return 'Unknown';
};

const FileIcon = ({ file }: { file: IUploadFile }) => {
    if (file?.mimeType === 'application/pdf') {
        return <SiAdobeacrobatreader />;
    }
    if (file?.mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        return <PiFileDocLight />;
    }
    if (file?.mimeType === 'application/vnd.ms-excel' || file?.mimeType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        return <PiMicrosoftExcelLogoLight />;
    }
    // if (file?.mimeType === 'image/svg+xml') {
    //     return <SiSvg />;
    // }
    if (file?.mimeType.includes('text')) {
        return <BsFileEarmarkText />;
    }
    if (file?.mimeType?.includes('image')) {
        return <img src={file?.url} alt={file?.originalName} style={{ objectFit: 'cover' }} />;
    }
    if (file?.mimeType?.includes('video')) {
        return <GoVideo />;
    }
    if (file?.mimeType?.includes('audio')) {
        return <MdOutlineAudiotrack />;
    }
    if (file?.mimeType?.includes('zip')) {
        return <GoFileZip />;
    }
    return <TbFileUnknown />;
};

export const AFilesList = ({ files }: IAFilesListProps) => {
    return (
        <>
            <List
                itemLayout="horizontal"
                dataSource={files}
                renderItem={(file, index) => (
                    <List.Item>
                        <List.Item.Meta avatar={<Avatar style={{ border: 'none' }} icon={<FileIcon file={file} />} />} title={file?.originalName} description={mimeTypeDescription(file)} />
                        <AButton type="text" icon={<HiOutlineFolderDownload size={16} />} onClick={() => downloadFile(file?.url)}></AButton>
                    </List.Item>
                )}
            />
        </>
    );
};
