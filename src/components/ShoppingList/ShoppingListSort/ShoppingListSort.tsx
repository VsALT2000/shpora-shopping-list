import styles from "./ShoppingListSort.module.css";
import { Button } from "../../UI/Button";
import { useState } from "react";

type SortProps = {
  onChangeSortOrder: any;
  currentSortOrder: any;
  sortOrderList: any
};


export const ShoppingListSort: React.FC<SortProps> = (props) => {
  const[selectedSortOrder, setSelectedSortOrder] = useState(props.currentSortOrder);
    
  const sortChangeHandler = (event: any) => {
    setSelectedSortOrder(event.target.value)
  }

  const confirmSortOrderHandler = () => {
    props.onChangeSortOrder(selectedSortOrder);
  }

  return (
    <div className={styles.shoppingListSort} onChange={sortChangeHandler}>
      <h1>Сортировка</h1>
      {Object.keys(props.sortOrderList).map((key) => (
        <div>
          <input type="radio" id={key} name='order' value={props.sortOrderList[key]} defaultChecked={props.sortOrderList[key] === selectedSortOrder ? true : false}/>
          <label htmlFor={key}>{props.sortOrderList[key]}</label>
      </div>
      ))}
      <Button name='Применить' onClick={confirmSortOrderHandler}/>
    </div>
  );
};
