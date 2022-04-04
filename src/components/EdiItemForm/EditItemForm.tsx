import styles from "./EditItemForm.module.css";
import { Button } from "../UI/Button";
import { EditProductType, ProductType, ShopType } from "../../types/types";
import { useState } from "react";
import { AddNewProduct, EditProduct } from "../../effector/ProductsStore";

type editItemFormProps = {
    onCloseForm: any;
    productData?: ProductType;
};

export const EditItemForm: React.FC<editItemFormProps> = (props) => {
    let caption, buttonName, submitFormHandler, defaultState: ProductType;

    if (props.productData) {
        defaultState = props.productData;
    } else {
        defaultState = {
            name: "",
            id: Math.random(),
            date: new Date(),
            amount: 1,
            bought: false,
        };
    }

    const [product, setProduct] = useState<ProductType>(defaultState);

    const addNewProductHandler = (event: any) => {
        event.preventDefault();
        AddNewProduct(product);
        props.onCloseForm();
    };

    const editProductHandler = (event: any) => {
        event.preventDefault();
        EditProduct({
            id: product.id,
            payload: {
                name:product.name,
                price: product.price,
                shop: product.shop,
                amount: product.amount,
            }
        })
        props.onCloseForm();
    };

    if (props.productData) {
        caption = "Редактирование товарa";
        buttonName = "Применить";
        submitFormHandler = editProductHandler;
    } else {
        caption = "Добавить товар";
        buttonName = "Добавить";
        submitFormHandler = addNewProductHandler;
    }

    const [amountError, setAmountError] = useState(false);

    const nameChangeHandler = (event: any) => {
        setProduct((prevState) => {
            return { ...prevState, name: event.target.value };
        });
    };

    const amountChangeHandler = (event: any) => {
        if (event.target.value.match(/^[0-9]+$/) !== null && Number(event.target.value) > 0) {
            setAmountError(false);
        } else {
            setAmountError(true);
        }
        setProduct((prevState) => {
            return { ...prevState, amount: event.target.value };
        });
    };

    const priceChangeHandler = (event: any) => {
        if (event.target.value.length > 0) {
            setProduct((prevState) => {
                return { ...prevState, price: event.target.value };
            });
        } else {
            setProduct((prevState) => {
                delete prevState.price;
                return { ...prevState };
            });
        }
    };

    const selectShopHandler = (event: any) => {
        if (Object.keys(ShopType).includes(event.target.value)) {
            setProduct((prevState) => {
                return { ...prevState, shop: ShopType[event.target.value as keyof typeof ShopType] };
            });
        } else {
            setProduct((prevState) => {
                delete prevState.shop;
                return { ...prevState };
            });
        }
    };

    const backdropClickHandler = (event: any) => {
        event.stopPropagation();
        props.onCloseForm();
    };

    let selectedShop = 'none';

    if(product.shop){
        selectedShop = product.shop;
    }


    return (
        <div className={styles.background}>
            <form className={styles.closedForm} onSubmit={submitFormHandler}>
                <div className={styles.editItemForm}>
                    <h1>{caption}</h1>
                    <label>*Название</label>
                    <input type="text" value={product.name} onChange={nameChangeHandler} />

                    <label>*Кол-во</label>
                    <input className={`${amountError && styles.error}`} type="number" value={product.amount} onChange={amountChangeHandler} />

                    <label>Единицы измерения</label>
                    <select>
                        <option>Выбери</option>
                        <option>Литр</option>
                        <option>Килограмм</option>
                        <option>Штука</option>
                    </select>

                    <label>Цена за единицу</label>
                    <input type="number" value={product.price} onChange={priceChangeHandler} step="0.01" />

                    <label>Магазин</label>
                    <select onChange={selectShopHandler}>
                        <option>Выбери</option>
                        {Object.keys(ShopType).map((key) => (
                            <option value={key} selected={selectedShop === ShopType[key as keyof typeof ShopType] ? true : false}>{ShopType[key as keyof typeof ShopType] }</option>
                        ))}
                    </select>
                    <Button name={buttonName} />
                </div>
            </form>
            <div className={styles.backdrop} onClick={backdropClickHandler}></div>
        </div>
    );
};
