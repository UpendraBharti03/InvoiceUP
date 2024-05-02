import { BaseCallApiResponse } from './';

export interface IMetadata {
    mimetype: string;
    originalName: string;
}

export interface IUploadFile {
    blobName: string;
    blobSize: number;
    blobType: string;
    container: string;
    encoding: string;
    etag: string;
    fieldname: string;
    metadata: IMetadata;
    mimeType: string;
    originalName: string;
    url: string;
    updatedAt: string;
}

export interface IUploadFileResult extends BaseCallApiResponse {
    file?: IUploadFile;
    url?: string;
}
