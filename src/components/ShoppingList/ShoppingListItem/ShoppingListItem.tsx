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

const ShoppingListItem: React.FC<ShoppingListItemProps> = ({product, listId}) => {
    const [closedOptions, setClosedOptions] = useState(true);
    
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

export default React.memo(ShoppingListItem);