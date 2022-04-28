import React, { useEffect, useState } from "react";
import styles from "./Actions.less";
import { EditItemForm } from "../../../EdiItemForm/EditItemForm";
import { ProductType } from "../../../../types/types";
import { DeleteIcon, EditIcon, KebabIcon } from "../../../Common/Icons/Icons";
import { DeleteProductFromList } from "../../../../models/productsList/ProductsListStore";

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
        <div className={styles.actionsWrapper} onClick={clickKebabHandler}>
            {openedForm && <EditItemForm editForm={true} listId={props.listId} onCloseForm={() => setOpenedForm(false)} productData={props.product} />}
            <div className={styles.kebab}>
               <KebabIcon /> 
            </div>
            {!openedKebab && <div className={styles.actions}>
                <div className={styles.editIcon} onClick={() => setOpenedForm(true)}>
                   <EditIcon/> 
                   <p>Изменить</p>
                </div>
                <div className={styles.deleteIcon} onClick={() => DeleteProductFromList({ listId: props.listId, productId: props.product.id })}>
                   <DeleteIcon/>
                   <p>Удалить</p> 
                </div>
                <div className={styles.triangle}></div>
            </div>}
        </div>
    );
};
