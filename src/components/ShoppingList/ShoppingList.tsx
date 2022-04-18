import React, { useEffect } from "react";
import {ShoppingListItem} from "./ShoppingListItem/ShoppingListItem";
import styles from "./ShoppingList.less";
import {useState} from "react";
import {$products, SelectList} from "../../models/productsList/SelectedListStore";
import {useStore} from "effector-react";
import {ShoppingListFilter} from "./ShoppingListFilter/ShoppingListFilter";
import {ShoppingListSort} from "./ShoppingListSort/ShoppingListSort";
import {sortingFunctions} from "../../utils/Utils";
import {AddNewItemIcon, FilterIcon, SortIcon} from "../Common/Icons/Icons";
import { $TotalSumStore } from "../../models/allProducts/TotalSumStore";

export enum sortOrderEnum {
    new = "Сначала новые",
    old = "Сначала старые",
    alph = "По алфавиту",
    cheap = "Сначала недорогие",
    exp = "Сначала дорогие",
}

interface ShoppingListProps {
    onOpenForm: (state: boolean) => void;
    listId: number;
}

export const ShoppingList: React.FC<ShoppingListProps> = (props) => {
    const [openedSort, setOpenedSort] = useState(false);
    const [openedFilter, setOpenedFilter] = useState(false);
    const [sortOrder, setSortOrder] = useState<sortOrderEnum>(sortOrderEnum.new);


    useEffect(() => {
        SelectList(props.listId);
    }, [])

    const changeSortOrderHandler = (newSortOrder: sortOrderEnum) => {
        setSortOrder(newSortOrder);
        setOpenedSort(false);
    };

    const openFilterHandler = () => {
        if (openedSort) {
            setOpenedSort(false);
        }
        setOpenedFilter(true);
    };

    const closeFilterHandler = () => {
        setOpenedFilter(false);
    };

    const openSortHandler = () => {
        if (openedFilter) {
            setOpenedFilter(false);
        }
        setOpenedSort(true);
    };

    const products = useStore($products);
    const total = useStore($TotalSumStore);

    return (
        <div className={styles.shoppingList}>
            <div className={styles.shoppingListHeader}>
                <h2>Список покупок</h2>
                <FilterIcon onClick={openFilterHandler}/>
                {openedFilter && <ShoppingListFilter onCloseFilter={closeFilterHandler}
                                                     onAbort={() => setOpenedFilter(false)}/>}
                <SortIcon onClick={openSortHandler}/>
                {openedSort && <ShoppingListSort currentSortOrder={sortOrder} onChangeSortOrder={changeSortOrderHandler}
                                                 onAbort={() => setOpenedSort(false)}/>}
            </div>
            <div className={styles.shoppingListTotal}>{products.length > 0 ? <p>Общая сумма: {total}₽</p> : null}</div>
            <div className={styles.shoppingListItems}>
                {products
                    .filter((product) => !product.bought)
                    .sort(sortingFunctions[sortOrder])
                    .map((product) => (
                        <ShoppingListItem {...product} key={product.id}/>
                    ))}
                {products
                    .filter((product) => product.bought)
                    .sort(sortingFunctions[sortOrder])
                    .map((product) => (
                        <ShoppingListItem {...product} key={product.id}/>
                    ))}
            </div>
            <div className={styles.addNewItemButton} onClick={() => props.onOpenForm(true)}>
                <div className={styles.addNewItemButtonBackground}>
                    <AddNewItemIcon/>
                </div>
            </div>
        </div>
    );
};
