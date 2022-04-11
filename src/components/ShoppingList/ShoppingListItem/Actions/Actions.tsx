import React, {useState} from "react";
import styles from "./Actions.less";
import {EditItemForm} from "../../../EdiItemForm/EditItemForm";
import {DeleteProduct} from "../../../../models/allProducts/ProductsStore";
import {ProductType} from "../../../../types/types";
import {DeleteIcon, EditIcon, KebabIcon} from "../../../Common/Icons/Icons";

interface ActionsProps {
    product: ProductType;
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
            {openedForm && <EditItemForm onCloseForm={closeFormHandler} productData={props.product}/>}
            <div className={styles.action}>
                <div className={`${styles.kebab} ${openedKebab ? styles.openedOptions : styles.closedOptions}`}
                     onClick={clickKebabHandler}>
                    <KebabIcon/>
                </div>
                <div className={`${styles.pencil} ${openedKebab ? styles.closedOptions : styles.openedOptions}`}
                     onClick={pencilClickHandler}>
                    <EditIcon/>
                </div>
                <div className={`${styles.trashCan} ${openedKebab ? styles.closedOptions : styles.openedOptions}`}
                     onClick={() => DeleteProduct(props.product.id)}>
                    <DeleteIcon/>
                </div>
            </div>

        </div>
    );
};
