
export type TListParams<Filter, StaticFilter> = {
    search: string;
    page: number;
    limit: number;
    filter: Filter;
    staticFilter: StaticFilter;
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