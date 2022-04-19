import React, {useState} from "react";
import styles from "./Actions.less";
import {EditItemForm} from "../../../EdiItemForm/EditItemForm";
import {ProductType} from "../../../../types/types";
import {DeleteIcon, EditIcon, KebabIcon} from "../../../Common/Icons/Icons";
import cn from "classnames";
import { DeleteProductFromList } from "../../../../models/productsList/ProductsListStore";

interface ActionsProps {
    product: ProductType;
    closeOptions: () => void;
    listId: number;
}

export const Actions: React.FC<ActionsProps> = (props) => {
    const [openedKebab, setOpenedKebab] = useState(true);
    const [openedForm, setOpenedForm] = useState(false);

    const closeKebab = () => {
        setOpenedKebab(true);
        window.removeEventListener("click", closeKebab);
    };

    const clickKebabHandler = (event: React.SyntheticEvent) => {
        event.stopPropagation();
        props.closeOptions();
        setOpenedKebab(false);
        window.addEventListener("click", closeKebab);
    };

    const pencilClickHandler = () => {
        setOpenedForm(true);
    }

    const closeFormHandler = () => {
        setOpenedForm(false);
    };

    return (
        <div className={styles.actionsWrapper}>
            {openedForm && <EditItemForm listId={props.listId} onCloseForm={closeFormHandler} productData={props.product}/>}
            <div className={styles.action}>
                <div className={cn(styles.kebab, {
                    [styles.openedOptions]: openedKebab,
                    [styles.closedOptions]: !openedKebab
                })}
                     onClick={clickKebabHandler}>
                    <KebabIcon/>
                </div>
                <div className={cn(styles.pencil, {
                    [styles.closedOptions]: openedKebab,
                    [styles.openedOptions]: !openedKebab
                })}
                     onClick={pencilClickHandler}>
                    <EditIcon/>
                </div>
                <div className={cn(styles.trashCan, {
                    [styles.closedOptions]: openedKebab,
                    [styles.openedOptions]: !openedKebab
                })}
                     onClick={() => DeleteProductFromList({listId: props.listId, productId: props.product.id})}>
                    <DeleteIcon/>
                </div>
            </div>

        </div>
    );
};
