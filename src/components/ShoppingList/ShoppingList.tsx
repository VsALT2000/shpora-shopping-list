import React, { useState } from "react";
import ShoppingListItem from "./ShoppingListItem/ShoppingListItem";
import styles from "./ShoppingList.less";
import { $productsStore } from "../../models/allProducts/ProductsStore";
import { $listsStore } from "../../models/productsList/ProductsListStore";
import { useStore } from "effector-react";
import { ShoppingListFilter } from "./ShoppingListFilter/ShoppingListFilter";
import { ShoppingListSort } from "./ShoppingListSort/ShoppingListSort";
import { sortingFunctions } from "../../utils/Utils";
import { FilterIcon, SortIcon, ShoppingBag } from "../Common/Icons/Icons";
import { ProductType, ShopType } from "../../types/types";
import { useNavigate, useParams } from "react-router-dom";
import { EditItemForm } from "../EdiItemForm/EditItemForm";
import AddNewItemButton from "../Common/FormControl/AddNewItemButton";
import { $activeFilters } from "../../models/filteredProducts/FilteredProductStore";
import { $activeSort } from "../../models/sortedProducts/SortedProductStore";
import DownloadTSV from "../Common/FormControl/DownloadTSV";
import { ReturnHeader } from "../Common/FormControl/ReturnHeader";

const ShoppingList = () => {
    const listId = Number(useParams().ShoppingListId);
    const [openedSort, setOpenedSort] = useState(false);
    const [openedFilter, setOpenedFilter] = useState(false);
    const [openedForm, setOpenedForm] = useState(false);
    const navigate = useNavigate();
    const products = useStore($productsStore);
    const sortOrder = useStore($activeSort);
    const list = useStore($listsStore).find((list) => list.id === listId);
    const filters = useStore($activeFilters);
    if (!list) return null;

    let pendingProducts = list.pendingProducts.map((id) => products.find((product) => product.id === id) as ProductType);
    let boughtProducts = list.boughtProducts.map((id) => products.find((product) => product.id === id) as ProductType);

    pendingProducts = pendingProducts.filter((product) => product !== undefined);
    boughtProducts = boughtProducts.filter((product) => product !== undefined);

    if (filters.length > 0) {
        pendingProducts = pendingProducts.filter((product) => filters.includes(product.shop as ShopType));
        boughtProducts = boughtProducts.filter((product) => filters.includes(product.shop as ShopType));
    }

    pendingProducts.sort(sortingFunctions[sortOrder]);
    boughtProducts.sort(sortingFunctions[sortOrder]);

    const allProducts = [...pendingProducts, ...boughtProducts];
    const total = allProducts.reduce((sum, { cost }) => sum + cost, 0);

    return (
        <div className={styles.shoppingList}>
            <ReturnHeader closeInput={() => navigate("/")} />
            <div className={styles.shoppingListContent}>
                <h1>{list.name}</h1>
                {(allProducts.length > 0 || filters.length > 0) && (
                    <div className={styles.shoppingListWrapp}>
                        <div className={styles.listControls}>
                            <div className={styles.filters}>
                                {filters.length > 0 && <div className={styles.filtersCounter}>{filters.length}</div>}
                                <DownloadTSV products={allProducts} name={list.name} />
                                <FilterIcon onClick={() => setOpenedFilter(true)} />
                                {openedFilter && <ShoppingListFilter onCloseFilter={() => setOpenedFilter(false)} />}
                                <SortIcon onClick={() => setOpenedSort(true)} />
                                {openedSort && <ShoppingListSort onCloseSort={() => setOpenedSort(false)} />}
                            </div>
                            {allProducts.length > 0 ? (
                                <div className={styles.shoppingListTotal}>
                                    <p>Общая сумма: {total}₽</p>
                                </div>
                            ) : (
                                <div className={styles.shoppingListTotal}>
                                    <p>
                                        Продукты по заданным
                                        <br /> фильтрам не найдены{" "}
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className={styles.shoppingListItems}>
                            {pendingProducts.map((product) => (
                                <ShoppingListItem product={product} listId={listId} key={product.id} />
                            ))}
                            {boughtProducts.map((product) => (
                                <ShoppingListItem product={{ ...product, bought: true }} listId={listId} key={product.id} />
                            ))}
                        </div>
                        <div className={styles.buttonSticky}>
                            <AddNewItemButton buttonName="Новый товар" onClick={() => setOpenedForm(true)} />
                        </div>
                    </div>
                )}
                {allProducts.length === 0 && filters.length === 0 && (
                    <div className={styles.emptyListWrapper}>
                        <div className={styles.emptyListContent}>
                            <div className={styles.emptyList}>
                                <ShoppingBag />
                            </div>
                            <div className={styles.buttonContainer}>
                                <AddNewItemButton buttonName="Новый товар" onClick={() => setOpenedForm(true)} />
                            </div>
                        </div>
                    </div>
                )}
                {openedForm && <EditItemForm editForm={false} listId={listId} onCloseForm={() => setOpenedForm(false)} />}
            </div>
        </div>
    );
};

export default ShoppingList;
