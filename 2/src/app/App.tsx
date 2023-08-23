import { Item } from "../components/Item/Item";
import { VirtualList } from "../components/VirtualList/VirtualList";
import { ListItem } from "../models/listItem";

import s from "./App.module.css";

function generateData(count: number): ListItem[] {
    const result: ListItem[] = [];
    for (let i = 0; i < count; i++) {
        result.push({ number: i });
    }
    return result;
}

function App() {
    const data: ListItem[] = generateData(1000);

    return (
        <div className={s.app}>
            <VirtualList
                height={250}
                width={400}
                itemCount={data.length}
                itemRender={({ index, key, style }) => (
                    <Item key={key} item={data[index]} style={style} />
                )}
            />
        </div>
    );
}

export default App;
