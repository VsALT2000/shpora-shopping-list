import styles from "./ShoppingListItem.less";
import React, {useState} from "react";
import {ProductType} from "../../../types/types";
import {Actions} from "./Actions/Actions";
import {BuyingProduct} from "../../../models/allProducts/ProductsStore";


export const ShoppingListItem: React.FC<ProductType> = (props) => {
    const [closedOptions, setClosedOptions] = useState(true);
    const contentClickHandler = () => {
        if (!props.bought)
            setClosedOptions(!closedOptions);
    };

    const dateOption = {
        year: 'numeric', month: 'numeric', day: 'numeric',
        hour: 'numeric', minute: 'numeric'
    };
    // @ts-ignore
    const date = new Intl.DateTimeFormat('ru', dateOption).format(props.date)
    const options = `${styles.shoppingListItemOptions} ${props.bought || closedOptions ? styles.closedOptions : styles.openedOptions}`;
    return (
        <div className={`${props.bought ? styles.boughtProduct : styles.itemWrapper}`}>
            <div className={styles.itemContentLeftPart}>
                <input type="checkbox" defaultChecked={props.bought} onChange={() => BuyingProduct(props.id)}/>
                <div className={styles.shoppingListItemContent} onClick={contentClickHandler}>
                    <label>{props.name}</label>
                    {(props.bought || closedOptions) && (
                        <span>
                        | {props.amount}{props.unit}{props.price && ` ${props.price * props.amount}₽`}
                    </span>
                    )}
                    <svg className={`${styles.arrow} ${!props.bought && !closedOptions && styles.arrowReverse}`} width="12" height="8"
                         viewBox="0 0 12 8" fill="none">
                        <path d="M11 1.75L6 7L0.999999 1.75" stroke="#8d8d8d" strokeWidth="2" strokeLinecap="round"
                              strokeLinejoin="round"/>
                    </svg>
                    <div>
                        <p className={options}>Количество: {props.amount}</p>
                        <p className={options}>Дата добавления:</p>
                        <p className={options}>{date}</p>
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
