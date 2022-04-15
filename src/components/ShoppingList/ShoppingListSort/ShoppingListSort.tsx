import React, {useState} from "react";
import Modal from "../../Common/Modal/Modal";
import {SortByType} from "../../../types/types";
import styles from './ShoppingListSort.less';

interface SortProps {
    onChangeSortOrder: (a: SortByType) => void;
    currentSortOrder: SortByType;
    onAbort: () => void;
}

export const ShoppingListSort: React.FC<SortProps> = (props) => {
    const [selectedSortOrder, setSelectedSortOrder] = useState(props.currentSortOrder);

    const sortChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedSortOrder(event.target.value as SortByType)
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
            {Object.keys(SortByType).map((key) => (
                <div key={key}>
                    <label>
                        <input className={styles.SortRadio} type="radio" id={key} name='order'
                               value={SortByType[key as keyof typeof SortByType]}
                               defaultChecked={SortByType[key as keyof typeof SortByType] === selectedSortOrder}
                               onChange={sortChangeHandler}/>
                        {SortByType[key as keyof typeof SortByType]}
                    </label>
                </div>))}
        </Modal>
    );
};
