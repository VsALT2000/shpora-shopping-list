import styles from "./ShoppingListItem.less";
import React, {useState} from "react";
import {ProductType} from "../../../types/types";
import {Actions} from "./Actions/Actions";


export const ShoppingListItem: React.FC<ProductType> = (props) => {
    const [closedOptions, setClosedOptions] = useState(true);
    const contentClickHandler = () => {
        setClosedOptions((prevState) => {
            return !prevState;
        });
    };

    const [purchasedProduct, setPurchasedProduct] = useState(false);

    const purchaseProductHandler = () => {
        setPurchasedProduct(true)
    }

    const dateOption = {
        year: 'numeric', month: 'numeric', day: 'numeric',
        hour: 'numeric', minute: 'numeric'
    };
    // @ts-ignore
    const date = new Intl.DateTimeFormat('ru', dateOption).format(props.date)
    const options = `${styles.shoppingListItemOptions} ${closedOptions ? styles.closedOptions : styles.openedOptions}`;
    return (
        <div className={styles.itemWrapper}>
            <div className={styles.itemContentLeftPart}>
                <input type="checkbox" defaultChecked={purchasedProduct} onChange={purchaseProductHandler}/>
                <div className={styles.shoppingListItemContent} onClick={contentClickHandler}>
                    <label>{props.name}</label>
                    {closedOptions && (
                        <span>
                        | {props.amount}{props.unit}{props.price && ` ${props.price * props.amount}₽`}
                    </span>
                    )}
                    <svg className={`${styles.arrow} ${!closedOptions && styles.arrowReverse}`} width="12" height="8"
                         viewBox="0 0 12 8" fill="none">
                        <path d="M11 1.75L6 7L0.999999 1.75" stroke="#8d8d8d" strokeWidth="2" strokeLinecap="round"
                              strokeLinejoin="round"/>
                    </svg>
                    <div>
                        <p className={options}>Количество: {props.amount}</p>
                        <p className={options}>Дата добавления: {date}</p>
                        {props.shop && <p className={options}>Магазин: {props.shop}</p>}
                        {props.price && <p className={options}>Цена: {props.price}₽</p>}
                    </div>
                </div>
            </div>
            <div>
                <Actions product={props}/>
            </div>
        </div>
    );
};
