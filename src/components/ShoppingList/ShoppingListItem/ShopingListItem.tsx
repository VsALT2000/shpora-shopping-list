import styles from "./ShoppingListItem.module.css";
import kebab from "../../images/kebab.svg";
import arrow from "../../images/arrow.svg";
import { useState } from "react";
import { ProductType} from "../../../types/types";






type shoppingListItemProps = { 
  product: ProductType;
}
export const ShopingListItem: React.FC <shoppingListItemProps> = (props) => {
  const [closedOptions, setClosedOptions ] = useState(true);
  const contentClickHandler = () => {
    setClosedOptions(prevState => { return !prevState});
  }
  return (
    <div className={styles.shoppingListItem}>
      <input type="checkbox" checked></input>
      <div className={styles.shoppingListItemContent} onClick={contentClickHandler}>
          <label>{props.product.name}</label>
          {closedOptions && <span>| {props.product.amount}шт {props.product.price}₽</span>}
          <img src={arrow} className={`${styles.arrow} ${!closedOptions && styles.arrowReverse}`}></img>
          <div className={`${styles.shoppingListItemOptions} ${closedOptions ? styles.closedOptions : styles.openedOptions}`}>
            <p>Магазин: {props.product.shop}</p>
            <p>Количество: {props.product.amount}</p>
            <p>Цена: {props.product.price}₽</p>
          </div>
      </div>
      <img src={kebab}></img>
    </div>
  );
};
