import React, { useEffect, useState } from "react";
import { ShoppingListItem } from "./ShoppingListItem/ShoppingListItem";
import styles from "./ShoppingList.less";
import { $store } from "../../models/allProducts/ProductsStore";
import { $listsStore } from "../../models/productsList/ProductsListStore";
import {useStore} from "effector-react";
import {ShoppingListFilter} from "./ShoppingListFilter/ShoppingListFilter";
import {ShoppingListSort} from "./ShoppingListSort/ShoppingListSort";
import {sortingFunctions} from "../../utils/Utils";
import {FilterIcon, SortIcon} from "../Common/Icons/Icons";
import {SortByType, ProductType, ShopType} from "../../types/types";
import {useParams} from "react-router-dom";
import {EditItemForm} from "../EdiItemForm/EditItemForm";
import AddNewItemButton from "../Common/FormControl/AddNewItemButton";
import { $activeFilters } from "../../models/filteredProducts/FilteredProductStore";

interface ShoppingListProps {
    onOpenForm: (state: boolean) => void;
    listId: number;
}

const ProductList: React.FC<ShoppingListProps> = (props) => {
    const [openedSort, setOpenedSort] = useState(false);
    const [openedFilter, setOpenedFilter] = useState(false);
    const [sortOrder, setSortOrder] = useState<SortByType>(SortByType.firstNew);

    const changeSortOrderHandler = (sortByType: SortByType) => {
        setSortOrder(sortByType);
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

    const total = [...list.boughtProducts, ...list.pendingProducts]
        .map((id) => products.find((product) => product.id === id) as ProductType)
        .filter((product) => (filters.length > 0 ? filters.includes(product.shop as ShopType) : true))
        .reduce((sum, { price, amount }) => (price ? sum + price * amount : sum), 0);

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
                {list &&
                    list.pendingProducts
                        .map((id) => products.find((product) => product.id === id) as ProductType)
                        .filter((product) => (filters.length > 0 ? filters.includes(product.shop as ShopType) : true))
                        .sort(sortingFunctions[sortOrder])
                        .map((product) => <ShoppingListItem product={product} listId={props.listId} key={product.id} />)}
                {list &&
                    list.boughtProducts
                        .map((id) => products.find((product) => product.id === id) as ProductType)
                        .filter((product) => (filters.length > 0 ? filters.includes(product.shop as ShopType) : true))
                        .sort(sortingFunctions[sortOrder])
                        .map((product) => <ShoppingListItem product={{ ...product, bought: true }} listId={props.listId} key={product.id} />)}
            </div>
            <AddNewItemButton onClick={() => props.onOpenForm(true)}/>
        </div>
    );
};

const ShoppingList = () => {
    const ShoppingListId = Number(useParams().ShoppingListId);
    const [openedForm, setOpenedForm] = useState(false);
    return (
        <div>
            <ProductList listId={ShoppingListId} onOpenForm={() => setOpenedForm(true)}/>
            {openedForm && <EditItemForm listId={ShoppingListId} onCloseForm={() => setOpenedForm(false)}/>}
        </div>
    );
}

export default ShoppingList;
