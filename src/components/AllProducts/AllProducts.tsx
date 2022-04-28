import React, { useState } from "react";
import styles from "./AllProducts.less";
import { useStore } from "effector-react";
import { $productsStore } from "../../models/allProducts/ProductsStore";
import { ArrowBackIcon, FilterIcon, SortIcon } from "../Common/Icons/Icons";
import { ShoppingListFilter } from "../ShoppingList/ShoppingListFilter/ShoppingListFilter";
import { ShoppingListSort } from "../ShoppingList/ShoppingListSort/ShoppingListSort";
import { ProductType, ShopType } from "../../types/types";
import { sortingFunctions } from "../../utils/Utils";
import { $activeFilters } from "../../models/filteredProducts/FilteredProductStore";
import cn from "classnames";
import { $activeSort } from "../../models/sortedProducts/SortedProductStore";
import { useNavigate } from "react-router-dom";
import DownloadTSV from "../Common/FormControl/DownloadTSV";

const AllProducts = () => {
    let allProducts = useStore($productsStore);
    const filters = useStore($activeFilters);
    const sortOrder = useStore($activeSort);
    const [openedSort, setOpenedSort] = useState(false);
    const [openedFilter, setOpenedFilter] = useState(false);
    const navigate = useNavigate();

    if (filters.length > 0) allProducts.sort(sortingFunctions[sortOrder]);
    return (
        <div className={styles.shoppingList}>
            <div className={styles.shoppingListHeader}>
                <ArrowBackIcon onClick={() => navigate("/")} />
                <h2>Все покупки</h2>
                {openedSort && <ShoppingListSort onCloseSort={() => setOpenedSort(false)} />}
            </div>
            <div className={styles.shoppingListItems}>
                {allProducts.map((product) => (
                    <Item {...product} key={product.id} />
                ))}
            </div>
        </div>
    );
};

const Item: React.FC<ProductType> = React.memo((props) => {
    const [closedOptions, setClosedOptions] = useState(true);
    const options = cn(styles.shoppingListItemOptions, {
        [styles.closedOptions]: closedOptions,
        [styles.openedOptions]: !closedOptions,
    });
    const dateOption = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    };
    // @ts-ignore
    const date = new Intl.DateTimeFormat("ru", dateOption).format(new Date(props.date));
    return (
        <div className={cn(styles.itemContentLeftPart, { [styles.boughtProduct]: props.bought })} onClick={() => setClosedOptions(!closedOptions)}>
            <div className={styles.itemInfo}>
                <label className={styles.itemLabel}>{props.name}</label>
                <span>{props.amount + props.unit + " " + props.cost + "₽"}</span>
            </div>
        </div>
    );
});

export default AllProducts;
