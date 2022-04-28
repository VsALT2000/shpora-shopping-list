import React from "react";
import {SortOrder} from "../../../types/types";
import styles from './ShoppingListSort.less';
import {$activeSort, ChangeSort} from "../../../models/sortedProducts/SortedProductStore";
import {useStore} from "effector-react";
import cn from "classnames";


interface SortProps {
    onCloseSort: () => void;
    nameButton?: string
    onApply?: (event: React.SyntheticEvent) => void
}

export const ShoppingListSort: React.FC<SortProps> = (props) => {
    let selectedSortOrder = useStore($activeSort);



    const confirmSortOrderHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log('2')
        event.stopPropagation();
        selectedSortOrder = event.target.value as SortOrder;
        ChangeSort(selectedSortOrder)
        props.onCloseSort();
    }

    return (
        <div className={styles.sortShell}>
            <h3>Сортировка</h3>
            {Object.keys(SortOrder).map((key) => (
                <div key={key}  className={cn({[styles.checked]: SortOrder[key as keyof typeof SortOrder] === selectedSortOrder})}>
                    <label>
                        <input className={styles.SortRadio} type="radio" id={key} name='order'
                               value={SortOrder[key as keyof typeof SortOrder]}
                               defaultChecked={SortOrder[key as keyof typeof SortOrder] === selectedSortOrder}
                               onChange={confirmSortOrderHandler}/>
                        {SortOrder[key as keyof typeof SortOrder]}
                    </label>
                </div>))}
        </div>
    );
};
