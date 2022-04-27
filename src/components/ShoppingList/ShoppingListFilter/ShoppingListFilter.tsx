import { ShopType } from "../../../types/types";
import React from "react";
import { ChangeFilter, $activeFilters } from "../../../models/filteredProducts/FilteredProductStore";
import { useStore } from "effector-react";
import styles from "./ShoppingListFilter.less";
import Checkbox from "../../Common/FormControl/Checkbox";
import { Button } from "../../Common/FormControl/Button";

interface FilterProps {
    onCloseFilter: () => void;
    nameButton?: string;
    onApply?: (event: React.SyntheticEvent) => void;
}

export const ShoppingListFilter: React.FC<FilterProps> = (props) => {
    const initialState: ShopType[] = useStore($activeFilters);
    const selectedFilter = new Set(initialState);

    const selectFilterHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            selectedFilter.add(ShopType[event.target.value as keyof typeof ShopType]);
        } else {
            selectedFilter.delete(ShopType[event.target.value as keyof typeof ShopType]);
        }
    };

    const confirmFilterHandler = (event: React.SyntheticEvent) => {
        event.stopPropagation();
        ChangeFilter(Array.from(selectedFilter));
        props.onCloseFilter();
    };
    const filters= $activeFilters.getState().length

    return (
            <div className={styles.filterShell}>
                <h3>Фильтр</h3>
                {Object.keys(ShopType).map((key) => (
                    <div key={key}>
                        <label>
                            <Checkbox
                                value={key}
                                id={key}
                                defaultChecked={selectedFilter.has(ShopType[key as keyof typeof ShopType])}
                                onChange={selectFilterHandler}
                            />
                            {ShopType[key as keyof typeof ShopType]}
                        </label>
                    </div>
                ))}
                <Button onClick={confirmFilterHandler}>{props.nameButton || "Применить"}</Button>
            </div>
    );
};
