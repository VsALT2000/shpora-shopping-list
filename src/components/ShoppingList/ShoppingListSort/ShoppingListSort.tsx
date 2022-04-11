import React, {useState} from "react";
import {sortOrderEnum} from '../ShoppingList'
import Modal from "../../Common/Modal/Modal";

interface SortProps {
    onChangeSortOrder: (a: sortOrderEnum) => void;
    currentSortOrder: sortOrderEnum;
    onAbort: () => void;
}

export const ShoppingListSort: React.FC<SortProps> = (props) => {
    const [selectedSortOrder, setSelectedSortOrder] = useState(props.currentSortOrder);

    const sortChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedSortOrder(event.target.value as sortOrderEnum)
    }

    const confirmSortOrderHandler = (event: React.SyntheticEvent) => {
        event.stopPropagation();
        props.onChangeSortOrder(selectedSortOrder);
    }

    return (
        <Modal
            header={'Сортировка'}
            onApply={confirmSortOrderHandler}
            onAbort={props.onAbort}
        >
            {Object.keys(sortOrderEnum).map((key) => (
                <div key={key}>
                    <label>
                        <input type="radio" id={key} name='order'
                               value={sortOrderEnum[key as keyof typeof sortOrderEnum]}
                               defaultChecked={sortOrderEnum[key as keyof typeof sortOrderEnum] === selectedSortOrder}
                               onChange={sortChangeHandler}/>
                        {sortOrderEnum[key as keyof typeof sortOrderEnum]}
                    </label>
                </div>))}
        </Modal>
    );
};
