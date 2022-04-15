import {ShopType} from "../../../types/types";
import React from "react";
import {ChangeFilter, $activeFilters} from "../../../models/filteredProducts/FilteredProductStore";
import {useStore} from "effector-react";
import Modal from "../../Common/Modal/Modal";
import Checkbox from "../../Common/FormControl/Checkbox";

interface FilterProps {
    onCloseFilter: () => void;
    onAbort: () => void;
}

export const ShoppingListFilter: React.FC<FilterProps> = (props) => {
    const initialState: ShopType[] = useStore($activeFilters);
    const selectedFilter = new Set(initialState);

    const selectFilterHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            selectedFilter.add(ShopType[event.target.value as keyof typeof ShopType]);
        } else {
            selectedFilter.delete(ShopType[event.target.value as keyof typeof ShopType])
        }
    };

    const confirmFilterHandler = (event: React.SyntheticEvent) => {
        event.stopPropagation()
        ChangeFilter(Array.from(selectedFilter));
        props.onCloseFilter();
    }

    return (
        <Modal
            header={'Фильтр'}
            onApply={confirmFilterHandler}
            onAbort={props.onAbort}
        >
            {Object.keys(ShopType).map((key) => (
                <div key={key}>
                    <label>
                        <Checkbox value={key} id={key}
                               defaultChecked={selectedFilter.has(ShopType[key as keyof typeof ShopType])}
                               onChange={selectFilterHandler}/>
                        {ShopType[key as keyof typeof ShopType]}
                    </label>
                </div>
            ))}
        </Modal>
    );
};
