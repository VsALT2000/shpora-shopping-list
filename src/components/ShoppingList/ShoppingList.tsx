import React, { useEffect } from "react";
import filter from "../images/filter.svg";
import { ShopingListItem } from "./ShoppingListItem/ShopingListItem";
import sort from "../images/sort.svg";
import plus from "../images/plus.svg";
import styles from "./ShoppingList.module.css";
import { useState } from "react";
import { $products } from "../../models/filteredProducts/FilteredProductStore";
import { useStore } from "effector-react";
import { ShoppingListFilter } from "./ShoppingListFilter/ShoppingListFilter";
import { ShoppingListSort } from "./ShoppingListSort/ShoppingListSort";
import { sortingFunctions } from "../../utils/Utils";

export enum sortOrderEnum {
    new = "Сначала новые",
    old = "Сначала старые",
    alph = "По алфавиту",
    cheap = "Сначала недорогие",
    exp = "Сначала дорогие",
}

interface ShoppingListProps{
    onOpenForm: (state:boolean) => void;
}



export const ShoppingList: React.FC<ShoppingListProps>= (props) => {
    
    const [openedSort, setOpenedSort] = useState(false);
    const [openedFilter, setOpenedFilter] = useState(false);

    const [sortOrder, setSortOrder] = useState<sortOrderEnum>(sortOrderEnum.new);

    const changeSortOrderHandler = (newSortOrder: sortOrderEnum) => {
        setSortOrder(newSortOrder);
        setOpenedSort(false);
    };

    useEffect(
        () => {console.log(1)},
        [openedSort]
    )


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

    const total = products.reduce((sum, { price, amount }) => (price ? sum + price * amount : sum), 0);

    return (
        <div className={styles.shoppingList}>
            <div className={styles.shoppingListHeader}>
                <h2>Список покупок</h2>

                <img src={filter} width="26px" onClick={openFilterHandler}></img>
                {openedFilter && <ShoppingListFilter onCloseFilter={closeFilterHandler} />}

                <img src={sort} width="30px" onClick={openSortHandler}></img>
                {openedSort && <ShoppingListSort currentSortOrder={sortOrder} sortOrderList={sortOrderEnum} onChangeSortOrder={changeSortOrderHandler} />}
            </div>
            <div className={styles.shoppingListItems}>
                {products.sort(sortingFunctions[sortOrder]).map((product) => (
                    <ShopingListItem {...product} key={product.id}/>
                ))}
            </div>
            <div className={styles.shoppingListTotal}>{products.length > 0 ? <p>Общая сумма: {total}₽</p> : <p>cписок пуст...</p>}</div>
            <div className={styles.addNewItemButton} onClick={() => {props.onOpenForm(true)}}>
                <div className={styles.addNewItemButtonBackground}>
                    <img src={plus}></img>
                </div>
                
            </div>
        </div>
    );
};
