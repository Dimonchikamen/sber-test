import React, { memo, useCallback, ReactElement, useState } from "react";
import { useDebounce } from "../../helpers/useDebounce";

import s from "./VirtualList.module.css";

type VirtualListProps = {
    itemCount: number;
    itemRender: ({ index }: { index: number }) => ReactElement;
    itemHeight?: number;
    height?: number;
    width?: number;
    renderBuffer?: number;
};

export const VirtualList = memo(
    ({
        itemRender,
        itemCount,
        itemHeight = 60,
        height = 250,
        width = 100,
        renderBuffer = 0,
    }: VirtualListProps) => {
        const indexDelta = Math.ceil(height / itemHeight);
        const [startRenderIndex, setStartRenderIndex] = useState(0);
        const [endRenderIndex, setEndRenderIndex] = useState(
            indexDelta + renderBuffer
        );
        const debouncedStartRenderIndex = useDebounce(startRenderIndex, 150);
        const debouncedEndRenderIndex = useDebounce(endRenderIndex, 150);
        const listHeight = itemHeight * itemCount;

        const scrollHandler = useCallback(
            (e: React.MouseEvent<HTMLDivElement>) => {
                //@ts-ignore
                const { scrollTop } = e.target;
                const previousElementsCount = Math.ceil(scrollTop / itemHeight);
                const newStartIndex = Math.max(
                    0,
                    previousElementsCount - 1 - renderBuffer
                );
                const newEndIndex = Math.min(
                    previousElementsCount + indexDelta + renderBuffer,
                    itemCount
                );
                setStartRenderIndex(newStartIndex);
                setEndRenderIndex(newEndIndex);
            },
            [itemCount, itemHeight, indexDelta, renderBuffer]
        );

        const renderItems = () => {
            const result = [];
            for (
                let i = debouncedStartRenderIndex;
                i < debouncedEndRenderIndex;
                i++
            ) {
                result.push(
                    <li
                        className={s.list_item}
                        key={`item-${i}`}
                        style={{
                            height: itemHeight,
                            position: "absolute",
                            top: i * itemHeight,
                        }}
                    >
                        {itemRender({
                            index: i,
                        })}
                    </li>
                );
            }
            return result;
        };

        return (
            <div
                className={s.container}
                style={{ height, width }}
                onScroll={scrollHandler}
            >
                <ul
                    className={s.list}
                    style={{ height: listHeight, maxHeight: listHeight }}
                >
                    {renderItems()}
                </ul>
            </div>
        );
    }
);
