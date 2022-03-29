import styles from "./ShoppingListSort.module.css";
import { Button } from "../../UI/Button";

export const ShoppingListSort: React.FC = () => {
  return (
    <div className={styles.shoppingListSort}>
      <h1>Сортировка</h1>
      <div>
        <input type="radio" id='new' name='order' checked />
        <label htmlFor='new'>Сначала новые</label>
      </div>
      <div>
        <input type="radio" id='old' name='order' checked />
        <label htmlFor='old'>Сначала старые</label>
      </div>
      <div>
        <input type="radio" id='alph' name='order' checked />
        <label htmlFor='alph'>По алфавиту</label>
      </div>
      <div>
        <input type="radio" id='cheap' name='order' checked />
        <label htmlFor='cheap'>Сначала недорогие</label>
      </div>
      <div>
        <input type="radio" id='exp' name='order' checked />
        <label htmlFor='exp'>Сначала дорогие</label>
      </div>
      <Button name='Применить'/>
    </div>
  );
};
