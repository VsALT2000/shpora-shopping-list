import styles from "./EditItemForm.module.css";
import { Button } from "../UI/Button";
import { ProductType } from "../../types/types";

type editItemFormProps = {
  mode: string;
  onCloseForm: any;
};

export const EditItemForm: React.FC<editItemFormProps> = (props) => {
  const addNewProductHandler = () => {};
  const editProductHandler = () => {};

  let caption, buttonName, buttonHandler;

  if (props.mode === "new") {
    caption = "Добавить товар";
    buttonName = "Добавить";
    buttonHandler = addNewProductHandler;
  } else {
    caption = "Редактирование товарa";
    buttonName = "Применить";
    buttonHandler = editProductHandler;
  }

  const backdropClickHandler = (event: any) => {
    event.stopPropagation();
    props.onCloseForm();
  };

  return (
    <div className={styles.background}>
      <form
        className={styles.closedForm}
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <div className={styles.editItemForm}>
          <h1>{caption}</h1>
          <label>*Название</label>
          <input type="text" value="" name="" />

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

          <Button name={buttonName} onClick={buttonHandler} />
        </div>
      </form>
      <div className={styles.backdrop} onClick={backdropClickHandler}></div>
    </div>
  );
};
