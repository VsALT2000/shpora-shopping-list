import React, {useState} from 'react';
import styles from './AllProducts.less';
import {useStore} from "effector-react";
import {$store} from "../../models/allProducts/ProductsStore";
import {ArrowIcon, FilterIcon, SortIcon} from "../Common/Icons/Icons";
import {ShoppingListFilter} from "../ShoppingList/ShoppingListFilter/ShoppingListFilter";
import {ShoppingListSort} from "../ShoppingList/ShoppingListSort/ShoppingListSort";
import {ProductType, ShopType, SortByType} from "../../types/types";
import {sortingFunctions} from "../../utils/Utils";
import {$activeFilters} from "../../models/filteredProducts/FilteredProductStore";
import cn from "classnames";

const AllProducts = () => {
    const allProducts = useStore($store);
    const filters = useStore($activeFilters);
    const [openedSort, setOpenedSort] = useState(false);
    const [openedFilter, setOpenedFilter] = useState(false);
    const [sortOrder, setSortOrder] = useState<SortByType>(SortByType.firstNew);

    const changeSortOrderHandler = (sortByType: SortByType) => {
        setSortOrder(sortByType);
        setOpenedSort(false);
    };

    const openFilterHandler = () => {
        if (openedSort)
            setOpenedSort(false);
        setOpenedFilter(true);
    };

    const closeFilterHandler = () => {
        setOpenedFilter(false);
    };

    const openSortHandler = () => {
        if (openedFilter)
            setOpenedFilter(false);
        setOpenedSort(true);
    };

    return (
        <div className={styles.shoppingList}>
            <div className={styles.shoppingListHeader}>
                <h2>Все покупки</h2>
                <FilterIcon onClick={openFilterHandler}/>
                {openedFilter &&
                    <ShoppingListFilter onCloseFilter={closeFilterHandler} onAbort={() => setOpenedFilter(false)}/>}
                <SortIcon onClick={openSortHandler}/>
                {openedSort && (
                    <ShoppingListSort currentSortOrder={sortOrder} onChangeSortOrder={changeSortOrderHandler}
                                      onAbort={() => setOpenedSort(false)}/>
                )}
            </div>
            <div className={styles.shoppingListItems}>
                {allProducts && allProducts
                    .filter((product) => (filters.length > 0 ? filters.includes(product.shop as ShopType) : true))
                    .sort(sortingFunctions[sortOrder])
                    .map((product) => <Item {...product} key={product.id}/>)}
            </div>
        </div>
    );
};

const Item: React.FC<ProductType> = (props) => {
    const [closedOptions, setClosedOptions] = useState(true);
    const options = cn(styles.shoppingListItemOptions, {
        [styles.closedOptions]: closedOptions,
        [styles.openedOptions]: !closedOptions
    });
    const dateOption = {
        year: 'numeric', month: 'numeric', day: 'numeric',
        hour: 'numeric', minute: 'numeric'
    };
    // @ts-ignore
    const date = new Intl.DateTimeFormat('ru', dateOption).format(props.date);
    return (
        <div className={styles.itemContentLeftPart} onClick={() => setClosedOptions(!closedOptions)}>
            <div>
                <label>{props.name}</label>
                {closedOptions && (
                    <span>
                        | {props.amount}{props.unit}{props.price && ` ${props.price * props.amount}₽`}
                    </span>
                )}
                <ArrowIcon className={cn(styles.arrow, {[styles.arrowReverse]: !closedOptions})}/>
                <div>
                    <p className={options}>Количество: {props.amount}</p>
                    <p className={options}>Дата добавления:</p>
                    <p className={options}>{date}</p>
                    {props.shop && <p className={options}>Магазин: {props.shop}</p>}
                    {props.price && <p className={options}>Цена: {props.price}₽</p>}
                </div>
            </div>
        </div>
    );
}

export default AllProducts;