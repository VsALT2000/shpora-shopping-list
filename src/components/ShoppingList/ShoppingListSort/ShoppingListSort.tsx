import styles from "./ShoppingListSort.less";
import {Button} from "../../UI/Button";
import React, {useState} from "react";
import {sortOrderEnum} from '../ShoppingList'

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
        <div className={styles.shoppingListSort} onChange={sortChangeHandler}>
            <h1>Сортировка</h1>
            {Object.keys(props.sortOrderList).map((key) => (
                <div key={key}>
                    <input type="radio" id={key} name='order' value={props.sortOrderList[key]}
                           defaultChecked={props.sortOrderList[key] === selectedSortOrder}/>
                    <label htmlFor={key}>{props.sortOrderList[key]}</label>
                </div>
            ))}
            <Button name='Применить' onClick={confirmSortOrderHandler}/>
        </div>
    );
};
