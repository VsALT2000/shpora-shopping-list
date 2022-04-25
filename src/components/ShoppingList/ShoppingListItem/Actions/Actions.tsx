import React, {useEffect, useState} from "react";
import styles from "./Actions.less";
import {EditItemForm} from "../../../EdiItemForm/EditItemForm";
import {ProductType} from "../../../../types/types";
import {DeleteIcon, EditIcon, KebabIcon} from "../../../Common/Icons/Icons";
import cn from "classnames";
import {DeleteProductFromList} from "../../../../models/productsList/ProductsListStore";

interface ActionsProps {
    product: ProductType;
    closeOptions: () => void;
    listId: number;
}

export const Actions: React.FC<ActionsProps> = (props) => {
    const [openedKebab, setOpenedKebab] = useState(true);
    const [openedForm, setOpenedForm] = useState(false);
    useEffect(() => () => setOpenedKebab(true), []);

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

    return (
        <div className={styles.actionsWrapper}>
            {openedForm &&
                <EditItemForm editForm={true} listId={props.listId} onCloseForm={() => setOpenedForm(false)} productData={props.product}/>}
            <div className={styles.action}>
                <div className={cn(styles.kebab, {[styles.openedOptions]: openedKebab})}
                     onClick={clickKebabHandler}>
                    <KebabIcon/>
                </div>
                <div className={cn(styles.blueIcon, {[styles.openedOptions]: !openedKebab})}
                     onClick={() => setOpenedForm(true)}>
                    <EditIcon/>
                </div>
                <div className={cn(styles.redIcon, {[styles.openedOptions]: !openedKebab})}
                     onClick={() => DeleteProductFromList({listId: props.listId, productId: props.product.id})}>
                    <DeleteIcon/>
                </div>
            </div>
        </div>
    );
};
