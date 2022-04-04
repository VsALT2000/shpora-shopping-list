import styles from "./ShoppingListItem.module.css";
import {BuyingProduct} from '../../../effector/ProductsStore';
import arrow from "../../images/arrow.svg";
import { useState } from "react";
import { ProductType } from "../../../types/types";
import { Actions } from "./Actions/Actions";

type shoppingListItemProps = {
    product: ProductType;
};

export const ShopingListItem: React.FC<shoppingListItemProps> = (props) => {
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
                <label>{props.product.name}</label>
                {closedOptions && (
                    <span>
                        | {props.product.amount}шт{props.product.price && ` ${props.product.price * props.product.amount}₽`}
                    </span>
                )}
                <img src={arrow} className={`${styles.arrow} ${!closedOptions && styles.arrowReverse}`}></img>
                <div className={`${styles.shoppingListItemOptions} ${closedOptions ? styles.closedOptions : styles.openedOptions}`}>
                    <p>Количество: {props.product.amount}</p>
                    {props.product.shop && <p>Магазин: {props.product.shop}</p>}
                    {props.product.price && <p>Цена: {props.product.price}₽</p>}
                </div>
            </div>
            <Actions product={props.product} />
        </div>
    );
};
