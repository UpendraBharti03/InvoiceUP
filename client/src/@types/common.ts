
export type TListParams<Filter> = {
    search?: string;
    page?: number;
    limit?: number | "ALL";
    filter?: Filter;
}

export type TFromTo = {
    from: number;
    to: number;
}

export type TPaginatedResponse<Result> = {
    results: Result[];
    totalResults: number;
    totalPages: number;
    page: number;
    fromTo: TFromTo;
    resultsInCurrentPage: number;
}