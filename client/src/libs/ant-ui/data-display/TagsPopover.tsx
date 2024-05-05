import { useMemo } from "react";
import { Popover, Tag } from 'antd';
import { getValueAtPathInObj } from "@ui-helpers";

export interface ITagsPopoverProps {
    title?: string;
    items: Array<any>;
    labelKey?: string;
    valueKey?: string;
}

export function TagsPopover({ labelKey = 'label', valueKey = 'value', items = [], title = '' }: ITagsPopoverProps) {

    const itemWithExtraKeys = useMemo(()=>{
        return items.map(item=>{
            return({
                ...item,
                label : getValueAtPathInObj({
                    obj: item,
                    path: labelKey
                }),
                value : getValueAtPathInObj({
                    obj: item,
                    path: valueKey
                })
            })
        })
    },[ JSON.stringify(items),valueKey,labelKey])

    return (
        <>
            {items.length > 0 ? (
                <>
                    {items.length === 1 ? (
                        <Tag key={itemWithExtraKeys?.[0]?.value}>{itemWithExtraKeys?.[0]?.label}</Tag>
                    ) : (
                        <Popover
                            className={'cursor-pointer'}
                            content={
                                <div>
                                    {itemWithExtraKeys.map((item: any) => (
                                        <Tag key={item?.value}> {item?.label}</Tag>
                                    ))}
                                </div>
                            }
                            title={title}
                            trigger="hover"
                        >
                            <Tag key={itemWithExtraKeys?.[0]?.value}>{itemWithExtraKeys?.[0]?.label}</Tag>
                            <Tag key={'+'}>+ {items.length - 1}</Tag>
                        </Popover>
                    )}
                </>
            ) : (
                '-'
            )}
        </>
    );
}
