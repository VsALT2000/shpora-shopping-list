import styles from "./ShoppingListItem.less";
import arrow from "../../images/arrow.svg";
import { useState } from "react";
import { ProductType } from "../../../types/types";
import { Actions } from "./Actions/Actions";


export const ShopingListItem: React.FC<ProductType> = (props) => {
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


    return (
        <div className={styles.shoppingListItem}>
            <input type="checkbox" defaultChecked={purchasedProduct} onChange={purchaseProductHandler}></input>
            <div className={styles.shoppingListItemContent} onClick={contentClickHandler}>
                <label>{props.name}</label>
                {closedOptions && (
                    <span>
                        | {props.amount}{props.unit}{props.price && ` ${props.price * props.amount}₽`}
                    </span>
                )}
                <img src={arrow} className={`${styles.arrow} ${!closedOptions && styles.arrowReverse}`}></img>
                <div className={`${styles.shoppingListItemOptions} ${closedOptions ? styles.closedOptions : styles.openedOptions}`}>
                    <p>Количество: {props.amount}</p>
                    {props.shop && <p>Магазин: {props.shop}</p>}
                    {props.price && <p>Цена: {props.price}₽</p>}
                </div>
            </div>
            <Actions product={props} />
        </div>
    );
};
