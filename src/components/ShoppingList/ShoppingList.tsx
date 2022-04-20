import React, {useEffect, useState} from "react";
import {ShoppingListItem} from "./ShoppingListItem/ShoppingListItem";
import styles from "./ShoppingList.less";
import {$store} from "../../models/allProducts/ProductsStore";
import {$listsStore} from "../../models/productsList/ProductsListStore";
import {useStore} from "effector-react";
import {ShoppingListFilter} from "./ShoppingListFilter/ShoppingListFilter";
import {ShoppingListSort} from "./ShoppingListSort/ShoppingListSort";
import {sortingFunctions} from "../../utils/Utils";
import {FilterIcon, SortIcon} from "../Common/Icons/Icons";
import {SortOrder, ProductType, ShopType} from "../../types/types";
import {useParams} from "react-router-dom";
import {EditItemForm} from "../EdiItemForm/EditItemForm";
import AddNewItemButton from "../Common/FormControl/AddNewItemButton";
import {$activeFilters} from "../../models/filteredProducts/FilteredProductStore";
import {$activeSort, ChangeSort} from "../../models/sortedProducts/SortedProductStore";

interface ShoppingListProps {
    onOpenForm: (state: boolean) => void;
    listId: number;
}

const ProductList: React.FC<ShoppingListProps> = (props) => {
    const [openedSort, setOpenedSort] = useState(false);
    const [openedFilter, setOpenedFilter] = useState(false);

    const changeSortOrderHandler = (sortByType: SortOrder) => {
        ChangeSort(sortByType);
        setOpenedSort(false);
    };

    const products = useStore($store);
    const sortOrder = useStore($activeSort);
    const list = useStore($listsStore).find((list) => list.id === props.listId);
    const filters = useStore($activeFilters);
    if (!list) return null;

    const allProducts = [...list.boughtProducts, ...list.pendingProducts];
    const total = allProducts
        .map((id) => products.find((product) => product.id === id) as ProductType)
        .filter((product) => (filters.length > 0 ? filters.includes(product.shop as ShopType) : true))
        .reduce((sum, {price, amount}) => (price ? sum + price * amount : sum), 0);

    return (
        <div className={styles.shoppingList}>
            <div className={styles.shoppingListHeader}>
                <h2>{list.name}</h2>
                <FilterIcon onClick={() => setOpenedFilter(true)}/>
                {openedFilter && <ShoppingListFilter onCloseFilter={() => setOpenedFilter(false)}/>}
                <SortIcon onClick={() => setOpenedSort(true)}/>
                {openedSort && <ShoppingListSort onCloseSort={() => setOpenedSort(false)}/>}
            </div>
            <div className={styles.shoppingListTotal}>{allProducts.length > 0 ?
                <p>Общая сумма: {total}₽</p> : null}</div>
            <div className={styles.shoppingListItems}>
                {list &&
                    list.pendingProducts
                        .map((id) => products.find((product) => product.id === id) as ProductType)
                        .filter((product) => (filters.length > 0 ? filters.includes(product.shop as ShopType) : true))
                        .sort(sortingFunctions[sortOrder])
                        .map((product) => <ShoppingListItem product={product} listId={props.listId} key={product.id}/>)}
                {list &&
                    list.boughtProducts
                        .map((id) => products.find((product) => product.id === id) as ProductType)
                        .filter((product) => (filters.length > 0 ? filters.includes(product.shop as ShopType) : true))
                        .sort(sortingFunctions[sortOrder])
                        .map((product) => <ShoppingListItem product={{...product, bought: true}} listId={props.listId}
                                                            key={product.id}/>)}
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
