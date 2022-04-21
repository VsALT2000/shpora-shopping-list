import React, { useEffect, useState } from "react";
import { ShoppingListItem } from "./ShoppingListItem/ShoppingListItem";
import styles from "./ShoppingList.less";
import { $store } from "../../models/allProducts/ProductsStore";
import { $listsStore } from "../../models/productsList/ProductsListStore";
import { useStore } from "effector-react";
import { ShoppingListFilter } from "./ShoppingListFilter/ShoppingListFilter";
import { ShoppingListSort } from "./ShoppingListSort/ShoppingListSort";
import { sortingFunctions } from "../../utils/Utils";
import { AddNewItemIcon, FilterIcon, SortIcon } from "../Common/Icons/Icons";
import { ProductType, ShopType } from "../../types/types";
import { $activeFilters } from "../../models/filteredProducts/FilteredProductStore";

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

    const products = useStore($store);
    const list = useStore($listsStore).find((list) => list.id === props.listId);
    const filters = useStore($activeFilters);
    if (!list) return null;

    let pendingProducts = list.pendingProducts.map((id) => products.find((product) => product.id === id) as ProductType);
    let boughtProducts = list.boughtProducts.map((id) => products.find((product) => product.id === id) as ProductType);

    if(filters.length > 0){
        pendingProducts = pendingProducts.filter((product) => (filters.includes(product.shop as ShopType)));
        boughtProducts = boughtProducts.filter((product) => (filters.includes(product.shop as ShopType)));
    }

    pendingProducts.sort(sortingFunctions[sortOrder]);
    boughtProducts.sort(sortingFunctions[sortOrder]);

    const total1 = [...list.boughtProducts, ...list.pendingProducts]
        .map((id) => products.find((product) => product.id === id) as ProductType)
        .filter((product) => (filters.length > 0 ? filters.includes(product.shop as ShopType) : true))
        .reduce((sum, { cost }) => (sum + cost), 0);

    const total = [...pendingProducts, ...boughtProducts].reduce((sum, { cost }) => (sum + cost), 0);

    return (
        <div className={styles.shoppingList}>
            <div className={styles.shoppingListHeader}>
                <h2>Список покупок</h2>
                <FilterIcon onClick={openFilterHandler} />
                {openedFilter && <ShoppingListFilter onCloseFilter={closeFilterHandler} onAbort={() => setOpenedFilter(false)} />}
                <SortIcon onClick={openSortHandler} />
                {openedSort && (
                    <ShoppingListSort currentSortOrder={sortOrder} onChangeSortOrder={changeSortOrderHandler} onAbort={() => setOpenedSort(false)} />
                )}
            </div>
            <div className={styles.shoppingListTotal}>{products.length > 0 ? <p>Общая сумма: {total}₽</p> : null}</div>
            <div className={styles.shoppingListItems}>
                {pendingProducts.map((product) => <ShoppingListItem product={product} listId={props.listId} key={product.id} />)}
                {boughtProducts.map((product) => <ShoppingListItem product={{ ...product, bought: true }} listId={props.listId} key={product.id} />)}
            </div>
            <div className={styles.addNewItemButton} onClick={() => props.onOpenForm(true)}>
                <div className={styles.addNewItemButtonBackground}>
                    <AddNewItemIcon />
                </div>
            </div>
        </div>
    );
};