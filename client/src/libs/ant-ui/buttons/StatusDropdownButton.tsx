import { ReactNode, useMemo } from 'react';
import { ASelectInput, IASelectInputProps } from '../data-entry';
import { theme, Typography } from "antd";

interface BaseRow {
    _id?: string;
    status?: string;
}

interface IStatusDropdownButtonProps<ItemType> extends IASelectInputProps {
    currentRow: ItemType;
    options?: Array<{ label: ReactNode; value: string }>;
}

/**
 * Status dropdown button
 * @param props
 */
export const AStatusDropdownButton = <ItemType extends BaseRow>({ options, ...props }: IStatusDropdownButtonProps<ItemType>) => {
    const {
        token,
    } = theme.useToken();

    const defaultOptions = useMemo(() => {
        return [
            {
                label: (
                    <Typography.Text
                        style={{
                            color: token.green8,
                        }}
                    >
                        ACTIVE
                    </Typography.Text>
                ),
                value: 'ACTIVE',
            },
            {
                label: (
                    <Typography.Text
                        style={{
                            color: token.red8,
                        }}
                    >
                        INACTIVE
                    </Typography.Text>
                ),
                value: 'INACTIVE',
            },
            {
                label: 'DRAFT',
                value: 'DRAFT',
            },
        ];
    }, [token]);

    return (
        <div>
            <ASelectInput preserveErrorSpace={false} value={props.currentRow?.status} options={options ?? defaultOptions} {...props} />
        </div>
    );
};
