import React, {
    memo,
    useCallback,
    ReactElement,
    CSSProperties,
    useState,
} from "react";

import s from "./VirtualList.module.css";

type VirtualListProps = {
    itemCount: number;
    itemRender: ({
        index,
        key,
        style,
    }: {
        index: number;
        key: string;
        style: CSSProperties;
    }) => ReactElement;
    itemHeight?: number;
    height?: number;
    width?: number;
    renderBuffer?: number;
};

export const VirtualList = memo(({
    itemRender,
    itemCount,
    itemHeight = 60,
    height = 250,
    width = 100,
    renderBuffer = 0,
}: VirtualListProps) => {
    const indexDelta = Math.ceil(height / itemHeight);
    const [startRenderIndex, setStartRenderIndex] = useState(0);
    const [endRenderIndex, setEndRenderIndex] = useState(indexDelta + renderBuffer);
    const listHeight = itemHeight * itemCount;

    const scrollHandler = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        //@ts-ignore
        const { scrollTop } = e.target;
        const previousElementsCount = Math.ceil(scrollTop / itemHeight);
        const newStartIndex = Math.max(0, previousElementsCount - 1 - renderBuffer);
        const newEndIndex = Math.min(previousElementsCount + indexDelta + renderBuffer, itemCount);
        setStartRenderIndex(newStartIndex);
        setEndRenderIndex(newEndIndex);
    }, [itemCount, itemHeight, indexDelta, renderBuffer]);

    const renderItems = () => {
        const result = [];
        for (let index = startRenderIndex; index < endRenderIndex; index++) {
            result.push(
                itemRender({
                    index,
                    key: `item-${index}`,
                    style: { height: itemHeight, position: "absolute", top: index * itemHeight },
                })
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
            <ul className={s.list} style={{ height: listHeight, maxHeight: listHeight }}>
                {renderItems()}
            </ul>
        </div>
    );
});
