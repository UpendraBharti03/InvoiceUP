export type TSendJSONResponse = {
    code?: number;
    success?: boolean;
    message?: string;
    data?: any;
}

declare global {
    namespace Express {
        export interface Response {
            sendJSONResponse: ({code, success, message, data}: TSendJSONResponse) => Response<any, Record<string, any>, number>
        }
    }
}