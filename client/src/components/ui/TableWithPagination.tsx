import React from "react";
import { TableProps } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import { ATable } from "@ant-ui";
import { TPaginatedResponse } from "@/@types/common";

export interface ATableWithPaginationProps<Result> extends Omit<TableProps, "loading"> {
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    limit: number;
    setLimit: React.Dispatch<React.SetStateAction<number>>;
    data: TPaginatedResponse<Result>;
    loading?: boolean;
}

export const TableWithPagination = <Result,>({ page = 1, setPage, limit = 10, setLimit, data, loading = false, ...props }: ATableWithPaginationProps<Result>) => {

    return (
        <ATable
            sticky
            bordered
            dataSource={data?.results}
            columns={props?.columns}
            pagination={{
                position: ['bottomRight'],
                showSizeChanger: true,
                responsive: true,
                current: page,
                pageSize: limit,
                total: data?.totalResults,
                onChange: (page, pageSize) => page < 1 ? setPage(1) : page > data?.totalPages ? setPage(data?.totalPages) : setPage(page),
                onShowSizeChange: (current, pageSize) => setLimit(pageSize),
            }}
            {...props}
            loading={{
                indicator: <LoadingOutlined style={{ fontSize: 24 }} spin />,
                spinning: !!loading
            }}
        />
    )
}