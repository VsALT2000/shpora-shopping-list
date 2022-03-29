import styles from "./ShoppingListItem.module.css";
import kebab from "../../images/kebab.svg";
import arrow from "../../images/arrow.svg";
import { useState } from "react";

export const ShopingListItem: React.FC = () => {
  const [closedOptions, setClosedOptions ] = useState(true);
  const contentClickHandler = () => {
    setClosedOptions(prevState => { return !prevState});
  }

  return (
    <div className={styles.shoppingListItem}>
      <input type="checkbox" checked></input>
      <div className={styles.shoppingListItemContent} onClick={contentClickHandler}>
          <label>Мафин</label>
          {closedOptions && <span>| 2шт 60₽</span>}
          <img src={arrow} className={`${styles.arrow} ${!closedOptions && styles.arrowReverse}`}></img>
          <div className={`${styles.shoppingListItemOptions} ${closedOptions ? styles.closedOptions : styles.openedOptions}`}>
            <p>Магазин: {}</p>
            <p>Количество: {}{}</p>
            <p>Цена: {}₽</p>
          </div>
      </div>
      <img src={kebab}></img>
    </div>
  );
};
