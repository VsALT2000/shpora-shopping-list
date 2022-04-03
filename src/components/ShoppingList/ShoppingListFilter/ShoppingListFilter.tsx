import { MarketListItem } from "./marketListItem";
import { Button } from "../../UI/Button";
import styles from "./ShoppingListFilter.module.css";
import { ShopType } from "../../../types/types";

type filterProps = {
    onCloseFilter: any;
};

export const ShoppingListFilter: React.FC<filterProps> = (props) => {
    return (
        <div className={styles.shoppingListFilter}>
            <h1>Фильтр</h1>

            {Object.keys(ShopType).map((key) => (
                <div>
                    <input value={key} type="checkbox" checked />
                    <label>{ShopType[key as keyof typeof ShopType]}</label>
                </div>
            ))}
            <Button name="Применить" onClick={props.onCloseFilter} />
        </div>
    );
};
