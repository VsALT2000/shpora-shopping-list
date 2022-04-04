import React from "react";
import filter from "../images/filter.svg";
import { ShopingListItem } from "./ShoppingListItem/ShopingListItem";
import sort from "../images/sort.svg";
import plus from "../images/plus.svg";
import styles from "./ShoppingList.module.css";
import { useState } from "react";
import { EditItemForm } from "../EdiItemForm/EditItemForm";
import { $products } from "../../effector/ProductsStore";
import { ProductType } from "../../types/types";
import { useStore } from "effector-react";
import { ShoppingListFilter } from "./ShoppingListFilter/ShoppingListFilter";
import { ShoppingListSort } from "./ShoppingListSort/ShoppingListSort";
import { Actions } from "./ShoppingListItem/Actions/Actions";

export const ShoppingList: React.FC = () => {
    const [openedForm, setOpenedForm] = useState<boolean>(false);
    const [openedSort, setOpenedSort] = useState<boolean>(false);
    const [openedFilter, setOpenedFilter] = useState<boolean>(false);

    enum sortOrderList {
        new = "Сначала новые",
        old = "Сначала старые",
        alph = "По алфавиту",
        cheap = "Сначала недорогие",
        exp = "Сначала дорогие",
    }

    const [sortOrder, setSortOrder] = useState<sortOrderList>(sortOrderList.new);

    const changeSortOrderHandler = (newSortOrder: sortOrderList) => {
        setSortOrder(newSortOrder);
        setOpenedSort(false);
    };

    const openFormHandler = () => {
        setOpenedForm(true);
    };
    const closeFormHandler = () => {
        setOpenedForm(false);
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

    switch (sortOrder) {
        case "Сначала недорогие":
            products.sort((a, b) => {
                if (a.price && b.price) {
                    return a.amount * a.price - b.amount * b.price;
                }
                if (a.price) {
                    return 1;
                }
                if (b.price) {
                    return -1;
                }
                return 0;
            });
            break;
        case "Сначала дорогие":
            products.sort((a, b) => {
                if (a.price && b.price) {
                    return b.amount * b.price - a.amount * a.price;
                }
                if (a.price) {
                    return -1;
                }
                if (b.price) {
                    return 1;
                }
                return 0;
            });
            break;
        case "По алфавиту":
            products.sort((a, b) => {
                let nameA = a.name.toLowerCase(),
                    nameB = b.name.toLowerCase();
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }
                return 0;
            });
            break;
        case "Сначала новые":
            products.sort((a, b) => {
                return b.date.getTime() - a.date.getTime();
            });
            break;
        case "Сначала старые":
            products.sort((a, b) => {
                return a.date.getTime() - b.date.getTime();
            });
            break;
    }

    const total = products.reduce((sum, product) => {
        if (product.price) {
            return sum + product.price * product.amount;
        } else {
            return sum;
        }
    }, 0);

    return (
        <div className={styles.shoppingList}>
            <div className={styles.shoppingListHeader}>
                <h2>Список покупок</h2>

                <img src={filter} width="26px" onClick={openFilterHandler}></img>
                {openedFilter && <ShoppingListFilter onCloseFilter={closeFilterHandler} />}

                <img src={sort} width="30px" onClick={openSortHandler}></img>
                {openedSort && <ShoppingListSort currentSortOrder={sortOrder} sortOrderList={sortOrderList} onChangeSortOrder={changeSortOrderHandler} />}
            </div>
            <div className={styles.shoppingListItems}>
                {products.map((product) => (
                    <ShopingListItem product={product} />
                ))}
            </div>
            <div className={styles.shoppingListTotal}>{products.length > 0 ? <p>Общая сумма: {total}₽</p> : <p>cписок пуст...</p>}</div>
            <div className={styles.addNewItemButton} onClick={openFormHandler}>
                <div className={styles.addNewItemButtonBackground}>
                    <img src={plus}></img>
                </div>
                {openedForm && <EditItemForm onCloseForm={closeFormHandler} />}
            </div>
        </div>
    );
};
