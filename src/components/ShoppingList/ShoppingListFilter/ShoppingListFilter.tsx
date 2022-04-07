import { Button } from "../../UI/Button";
import styles from "./ShoppingListFilter.less";
import { ShopType } from "../../../types/types";
import { useState } from "react";
import { ChangeFilter, $activeFilters } from "../../../models/filteredProducts/FilteredProductStore";
import { useStore } from "effector-react";

interface FilterProps  {
    onCloseFilter: () => void;
};

export const ShoppingListFilter: React.FC<FilterProps> = (props) => {
    const initialState: ShopType[] = useStore($activeFilters);
    const [selectedFilter, setSelectedFilter] = useState<ShopType[]>(initialState);


    const selectFilterHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const shopName = ShopType[event.target.value as keyof typeof ShopType];
        setSelectedFilter((prevState) => {
            if (prevState.includes(shopName)) {
               return prevState.filter(shop => shop !== shopName)
            }
            return [...prevState, shopName]
        });
    };

    const confirmFilterHandler = () => {
        ChangeFilter(selectedFilter);
        props.onCloseFilter();
    }

    return (
        <div className={styles.shoppingListFilter}>
            <h1>Фильтр</h1>

            {Object.keys(ShopType).map((key) => (
                <div key={key}>
                    <input value={key} id={key} type="checkbox" defaultChecked={selectedFilter.includes(ShopType[key as keyof typeof ShopType]) ? true : false} onChange={selectFilterHandler} />
                    <label htmlFor={key}>{ShopType[key as keyof typeof ShopType]}</label>
                </div>
            ))}
            <Button name="Применить" onClick={confirmFilterHandler} />
        </div>
    );
};
