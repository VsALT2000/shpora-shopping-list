import React, {useState} from "react";
import {sortOrderEnum} from '../ShoppingList'
import Modal from "../../Common/Modal/Modal";

interface SortProps {
    onChangeSortOrder: (a: sortOrderEnum) => void;
    currentSortOrder: sortOrderEnum;
    sortOrderList: any;
}

export const ShoppingListSort: React.FC<SortProps> = (props) => {
    const [selectedSortOrder, setSelectedSortOrder] = useState(props.currentSortOrder);

    const sortChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedSortOrder(event.target.value as sortOrderEnum)
    }

    const confirmSortOrderHandler = () => {
        props.onChangeSortOrder(selectedSortOrder);
    }

    return (
        <Modal
            header={'Сортировка'}
            body={Object.keys(props.sortOrderList).map((key) => (
                <div key={key}>
                    <label>
                        <input type="radio" id={key} name='order' value={props.sortOrderList[key]}
                               defaultChecked={props.sortOrderList[key] === selectedSortOrder}
                               onChange={sortChangeHandler}/>
                        {props.sortOrderList[key]}
                    </label>
                </div>
            ))}
            onApply={confirmSortOrderHandler}
        />
    );
};
