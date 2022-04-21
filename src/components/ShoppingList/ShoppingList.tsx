import React, {useState} from "react";
import {ShoppingListItem} from "./ShoppingListItem/ShoppingListItem";
import styles from "./ShoppingList.less";
import {$store} from "../../models/allProducts/ProductsStore";
import {$listsStore} from "../../models/productsList/ProductsListStore";
import {useStore} from "effector-react";
import {ShoppingListFilter} from "./ShoppingListFilter/ShoppingListFilter";
import {ShoppingListSort} from "./ShoppingListSort/ShoppingListSort";
import {sortingFunctions} from "../../utils/Utils";
import {ArrowBackIcon, FilterIcon, SortIcon} from "../Common/Icons/Icons";
import {ProductType, ShopType} from "../../types/types";
import {useNavigate, useParams} from "react-router-dom";
import {EditItemForm} from "../EdiItemForm/EditItemForm";
import AddNewItemButton from "../Common/FormControl/AddNewItemButton";
import {$activeFilters} from "../../models/filteredProducts/FilteredProductStore";
import {$activeSort} from "../../models/sortedProducts/SortedProductStore";

interface ShoppingListProps {
    onOpenForm: (state: boolean) => void;
    listId: number;
}

const ProductList: React.FC<ShoppingListProps> = (props) => {
    const [openedSort, setOpenedSort] = useState(false);
    const [openedFilter, setOpenedFilter] = useState(false);
    const navigate = useNavigate();
    const products = useStore($store);
    const sortOrder = useStore($activeSort);
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

    const allProducts = [...pendingProducts, ...boughtProducts];
    const total = allProducts.reduce((sum, { cost }) => (sum + cost), 0);

    return (
        <div className={styles.shoppingList}>
            <div className={styles.shoppingListHeader}>
                <ArrowBackIcon onClick={() => navigate("/")}/>
                <h2>{list.name}</h2>
                <FilterIcon onClick={() => setOpenedFilter(true)}/>
                {openedFilter && <ShoppingListFilter onCloseFilter={() => setOpenedFilter(false)}/>}
                <SortIcon onClick={() => setOpenedSort(true)}/>
                {openedSort && <ShoppingListSort onCloseSort={() => setOpenedSort(false)}/>}
            </div>
            <div className={styles.shoppingListTotal}>{allProducts.length > 0 ?
                <p>Общая сумма: {total}₽</p> : null}</div>
            <div className={styles.shoppingListItems}>
                {pendingProducts.map((product) => <ShoppingListItem product={product} listId={props.listId} key={product.id} />)}
                {boughtProducts.map((product) => <ShoppingListItem product={{ ...product, bought: true }} listId={props.listId} key={product.id} />)}
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
