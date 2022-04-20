import React, {useState} from "react";
import Modal from "../../Common/Modal/Modal";
import {SortOrder} from "../../../types/types";
import styles from './ShoppingListSort.less';
import {$activeSort, ChangeSort} from "../../../models/sortedProducts/SortedProductStore";
import {useStore} from "effector-react";

interface SortProps {
    onCloseSort: () => void;
}

export const ShoppingListSort: React.FC<SortProps> = (props) => {
    let selectedSortOrder = useStore($activeSort);

    const sortChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        selectedSortOrder = event.target.value as SortOrder
    }

    const confirmSortOrderHandler = (event: React.SyntheticEvent) => {
        event.stopPropagation();
        ChangeSort(selectedSortOrder)
        props.onCloseSort();
    }

    return (
        <Modal
            header={'Сортировка'}
            onApply={confirmSortOrderHandler}
            onAbort={props.onCloseSort}
        >
            {Object.keys(SortOrder).map((key) => (
                <div key={key}>
                    <label>
                        <input className={styles.SortRadio} type="radio" id={key} name='order'
                               value={SortOrder[key as keyof typeof SortOrder]}
                               defaultChecked={SortOrder[key as keyof typeof SortOrder] === selectedSortOrder}
                               onChange={sortChangeHandler}/>
                        {SortOrder[key as keyof typeof SortOrder]}
                    </label>
                </div>))}
        </Modal>
    );
};
