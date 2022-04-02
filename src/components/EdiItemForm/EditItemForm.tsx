import styles from "./EditItemForm.module.css";
import { Button } from "../UI/Button";
import { ProductType, ShopType } from "../../types/types";
import { useState } from "react";
import {AddNewProduct} from '../../effector/ProductsStore'

type editItemFormProps = {
  mode: string;
  onCloseForm: any;
};

export const EditItemForm: React.FC<editItemFormProps> = (props) => {
  const [product, setProduct] = useState<ProductType>({
    name: "",
    id: Math.random(),
    date: new Date(),
    amount: 0,
    bought: false,
  });

  const[amountError, setAmountError] = useState(false)

  const nameChangeHandler = (event: any) => {
    setProduct((prevState) => {return {...prevState, name: event.target.value}})
  }

  const amountChangeHandler = (event: any) => {
    if(event.target.value.match(/^[0-9]+$/) === null){
      setAmountError(true)
    }else{
      setAmountError(false)
    }
    setProduct((prevState) => {return {...prevState, amount: event.target.value}})
  }

  const priceChangeHandler = (event:any) => {
    if(event.target.value.length > 0){
      setProduct((prevState) => {return {...prevState, price: event.target.value}})
    }else{
      setProduct((prevState) => {
        delete prevState.price;
        return {...prevState};
      })
    }
  }


  const addNewProductHandler = (event: any) => {
    event.preventDefault();
    AddNewProduct(product);
    props.onCloseForm();
  };


  const selectShopHandler = (event:any) =>{
    if (Object.keys(ShopType).includes(event.target.value)){
      setProduct((prevState) => {return {...prevState, shop: ShopType[event.target.value as keyof typeof ShopType]}})
    }else{
      setProduct((prevState) => {
        delete prevState.shop;
        return {...prevState};
      })
    }
  }


  const editProductHandler = () => {};

  let caption, buttonName, submitFormHandler;

  if (props.mode === "new") {
    caption = "Добавить товар";
    buttonName = "Добавить";
    submitFormHandler = addNewProductHandler;
  } else {
    caption = "Редактирование товарa";
    buttonName = "Применить";
    submitFormHandler = editProductHandler;
  }

  const backdropClickHandler = (event: any) => {
    event.stopPropagation();
    props.onCloseForm();
  };

  return (
    <div className={styles.background}>
      <form
        className={styles.closedForm}
        onSubmit={submitFormHandler}
      >
        <div className={styles.editItemForm}>
          <h1>{caption}</h1>
          <label>*Название</label>
          <input type="text" value={product.name} onChange={nameChangeHandler} />

          <label>*Кол-во</label>
          <input className={`${amountError && styles.error}`} type="number" value={product.amount} onChange={amountChangeHandler}/>

          <label>Единицы измерения</label>
          <select>
            <option>Выбери</option>
            <option>Литр</option>
            <option>Килограмм</option>
            <option>Штука</option>
          </select>

          <label>Цена за единицу</label>
          <input type="number" value={product.price} onChange={priceChangeHandler}/>

          <label>Магазин</label>
          <select onChange={selectShopHandler}>
            <option>Выбери</option>
            {Object.keys(ShopType).map((key) => (
              <option value={key}>{ShopType[key as keyof typeof ShopType]}</option>
            ))}
          </select>

          <Button name={buttonName} />
        </div>
      </form>
      <div className={styles.backdrop} onClick={backdropClickHandler}></div>
    </div>
  );
};
