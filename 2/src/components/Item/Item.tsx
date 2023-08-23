import { CSSProperties, FC } from "react";
import { ListItem } from "../../models/listItem";

import s from "./Item.module.css";

type ItemProps = {
    item: ListItem;
    style?: CSSProperties;
}

export const Item: FC<ItemProps> = ({ item, style }) => {
    return (
        <li className={s.list_item} style={style}>
            {item.number}
        </li>
    )
}