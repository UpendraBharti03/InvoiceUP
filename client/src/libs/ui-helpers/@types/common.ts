export interface ICommonOptionsRequestResult<ResultItem> {
    error: boolean;
    results: Array<ResultItem>;
}

export interface IMongoObject {
    _id: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}

export interface IMongoObjectWithoutTimeStamps {
    _id: string;
    __v: number;
}

export interface BaseCallApiResponse {
    error: boolean;
}

export interface ICommonOptionsRequestSingleResult<ResultItem> extends BaseCallApiResponse {
    result: ResultItem;
}

export interface IPaginatedListRequestResult<ResultItem> extends BaseCallApiResponse {
    results?: Array<ResultItem>;
    totalResults?: number;
    totalPages?: number;
    page?: number;
    resultsInCurrentPage?: number;
}
