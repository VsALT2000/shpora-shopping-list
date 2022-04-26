import styles from "./ShoppingListItem.less";
import React, { useState } from "react";
import { ProductType } from "../../../types/types";
import { Actions } from "./Actions/Actions";
import Checkbox from "../../Common/FormControl/Checkbox";
import cn from "classnames";
import { ToggleProductBoughtState } from "../../../models/productsList/ProductsListStore";

interface ShoppingListItemProps {
    product: ProductType;
    listId: number;
}

export const ShoppingListItem: React.FC<ShoppingListItemProps> = ({ product, listId }) => {
    const [closedOptions, setClosedOptions] = useState(true);

    const dateOption = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    };
    // @ts-ignore
    const date = new Intl.DateTimeFormat("ru", dateOption).format(new Date(product.date));
    const options = cn(styles.shoppingListItemOptions, {
        [styles.closedOptions]: product.bought || closedOptions,
        [styles.openedOptions]: !(product.bought || closedOptions),
    });
    return (
        <div
            className={cn(styles.itemWrapper, {
                [styles.boughtProduct]: product.bought,
            })}
        >
            <div className={styles.itemContentLeftPart}>
                <Checkbox defaultChecked={product.bought} onChange={() => ToggleProductBoughtState({ listId, productId: product.id })} />
                <div className={styles.shoppingListItemContent}>
                    <div className={styles.q}>
                        <label>{product.name}</label>
                        {(product.bought || closedOptions) && <span>{product.amount + product.unit + " " + product.cost + "₽"}</span>}
                    </div>
                </div>
            </div>
            <div>
                <Actions listId={listId} product={product} closeOptions={() => setClosedOptions(true)} />
            </div>
        </div>
    );
};
