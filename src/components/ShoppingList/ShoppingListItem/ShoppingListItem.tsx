import styles from "./ShoppingListItem.less";
import React, {useState} from "react";
import {ProductType} from "../../../types/types";
import {Actions} from "./Actions/Actions";
import {BuyingProduct} from "../../../models/allProducts/ProductsStore";
import {ArrowIcon} from "../../Common/Icons/Icons";
import Checkbox from "../../Common/FormControl/Checkbox";


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
                <Checkbox defaultChecked={props.bought} onChange={() => BuyingProduct(props.id)}/>
                <div className={styles.shoppingListItemContent} onClick={contentClickHandler}>
                    <label>{props.name}</label>
                    {(props.bought || closedOptions) && (
                        <span>
                        | {props.amount}{props.unit}{props.price && ` ${props.price * props.amount}₽`}
                    </span>
                    )}
                    <ArrowIcon className={`${styles.arrow} ${!props.bought && !closedOptions && styles.arrowReverse}`}/>
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
                <Actions product={props} closeOptions={() => setClosedOptions(true)}/>
            </div>
        </div>
    );
};
