import styles from "./EditItemForm.module.css";
import {Button} from '../UI/Button'

type editItemFormProps = {
  mode: string;
};

export const EditItemForm: React.FC<editItemFormProps> = (props) => {

  let caption;
  let buttonName;

  if (props.mode === "new") {
    caption = "Добавить товар";
    buttonName = "Добавить";
  } else {
    caption = "Редактирование товарa";
    buttonName = "Применить";
  }

  return (
    <form className={styles.closedForm}>
      <div className={styles.editItemForm}>
        <h1>{caption}</h1>
        <label>*Название</label>
        <input type="text" value="" />

        <label>*Кол-во</label>
        <input type="text" value="" />

        <label>Единицы измерения</label>
        <select>
          <option>Выбери</option>
          <option>Литр</option>
          <option>Килограмм</option>
          <option>Штука</option>
        </select>

        <label>Цена за единицу</label>
        <input type="text" value="" />

        <label>Магазин</label>
        <input type="text" value=""></input>

        <Button name={buttonName}/>
      </div>
    </form>
  );
};
