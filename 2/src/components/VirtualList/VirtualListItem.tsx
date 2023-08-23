import { memo, ReactElement } from "react";

import s from "./VirtualList.module.css";

type VirtialListItemProps = {
    index: number;
    itemHeight: number;
    itemRender: ({ index }: { index: number }) => ReactElement;
};

export const VirtualListItem = memo(
    ({ index, itemHeight, itemRender }: VirtialListItemProps) => {
        console.log("RENDER");
        return (
            <li
                className={s.list_item}
                style={{
                    height: itemHeight,
                    position: "absolute",
                    top: index * itemHeight,
                }}
            >
                {itemRender({
                    index,
                })}
            </li>
        );
    }
);
