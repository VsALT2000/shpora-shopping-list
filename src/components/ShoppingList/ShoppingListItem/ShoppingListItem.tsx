import styles from "./ShoppingListItem.less";
import React, {useState} from "react";
import {ProductType} from "../../../types/types";
import {Actions} from "./Actions/Actions";
import {BuyingProduct} from "../../../models/allProducts/ProductsStore";
import {ArrowIcon} from "../../Common/Icons/Icons";
import Checkbox from "../../Common/FormControl/Checkbox";
import cn from "classnames";
import { ToggleProductBoughtState } from "../../../models/productsList/ProductsListStore";
import { prependOnceListener } from "process";

interface ShoppingListItemProps {
    product: ProductType,
    listId: number,
}

export const ShoppingListItem: React.FC<ShoppingListItemProps> = ({product, listId}) => {
    const [closedOptions, setClosedOptions] = useState(true);
    const contentClickHandler = () => {
        if (!product.bought)
            setClosedOptions(!closedOptions);
    };

    const dateOption = {
        year: 'numeric', month: 'numeric', day: 'numeric',
        hour: 'numeric', minute: 'numeric'
    };
    // @ts-ignore
    const date = new Intl.DateTimeFormat('ru', dateOption).format(product.date)
    const options = cn(styles.shoppingListItemOptions, {
        [styles.closedOptions]: product.bought || closedOptions,
        [styles.openedOptions]: !(product.bought || closedOptions)
    });
    return (
        <div className={cn(styles.itemWrapper, {
            [styles.boughtProduct]: product.bought
        })}>
            <div className={styles.itemContentLeftPart}>
                <Checkbox defaultChecked={product.bought} onChange={() => ToggleProductBoughtState({listId, productId: product.id})}/>
                <div className={styles.shoppingListItemContent} onClick={contentClickHandler}>
                    <label>{product.name}</label>
                    {(product.bought || closedOptions) && (
                        <span>
                        | {product.amount}{product.unit}{` ${product.cost}₽`}
                    </span>
                    )}
                    <ArrowIcon className={cn(styles.arrow, {[styles.arrowReverse]: !product.bought && !closedOptions})}/>
                    <div>
                        <p className={options}>Количество: {product.amount}</p>
                        <p className={options}>Дата добавления:</p>
                        <p className={options}>{date}</p>
                        {product.shop && <p className={options}>Магазин: {product.shop}</p>}
                        {product.price ? <p className={options}>Цена: {product.price}₽</p> : <p className={options}>Примерная стоимость: {product.cost}₽</p>}
                    </div>
                </div>
            </div>
            <div>
                <Actions listId={listId} product={product} closeOptions={() => setClosedOptions(true)}/>
            </div>
        </div>
    );
};