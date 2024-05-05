export interface BaseCallApiResponse {
  error: boolean;
}

export interface IMetadata {
  mimetype: string;
  originalname: string;
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
  mimetype: string;
  originalname: string;
  url: string;
}

export interface IUploadFileResult extends BaseCallApiResponse{
  file?: IUploadFile;
  url?: string;
}

export interface ITempFileUploadResponse {
  fieldname:    string;
  encoding:     string;
  mimetype:     string;
  url:          string;
  blobName:     string;
  etag:         string;
  blobType:     string;
  metadata:     Metadata;
  container:    string;
  blobSize:     string;
  originalName: string;
}

export interface Metadata {
  originalName: string;
  mimeType:     string;
}

