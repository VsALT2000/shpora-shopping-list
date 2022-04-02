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


export const ShoppingList: React.FC = () => {
  const [openedForm, setOpenedForm] = useState<boolean>(false);
  const [openedSort, setOpenedSort] = useState<boolean>(false);
  const [openedFilter, setOpenedFilter] = useState<boolean>(false);



  const openFormHandler = () => {
    setOpenedForm(true);
  };
  const closeFormHandler = () => {
    setOpenedForm(false);
  }



  const openFilterHandler = () => {
    setOpenedFilter(true);
  };

  const closeFilterHandler = () => {
    setOpenedFilter(false);
  };



  const products = useStore($products)
  return (
    <div className={styles.shoppingList}>
      <div className={styles.shoppingListHeader}>
        <h2>Список покупок</h2>
        <img src={filter} width="30px" onClick={openFilterHandler}></img>
        <img src={sort} width="30px"></img>
      </div>
      <div className={styles.shoppingListItems}>
        {products.map((product) => <ShopingListItem product={product}/>)}
      </div>
      <div className={styles.shoppingListTotal}>
        <p>Общая сумма: </p>
      </div>
      <div className={styles.addNewItemButton} onClick={openFormHandler}>
        <div className={styles.addNewItemButtonBackground}>
          <img src={plus}></img>
        </div>
        {openedForm && <EditItemForm mode="new" onCloseForm={closeFormHandler}/> }
      </div>
    </div>
  );
};
