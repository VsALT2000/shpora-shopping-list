import React, {useState} from "react";
import styles from "./Actions.less";
import {EditItemForm} from "../../../EdiItemForm/EditItemForm";
import {DeleteProduct} from "../../../../models/allProducts/ProductsStore";
import {ProductType} from "../../../../types/types";

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
                    <svg width="26" height="16" viewBox="0 0 26 6" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd"
                              d="M3 -4.41063e-07C4.65685 -4.21305e-07 6 1.34315 6 3C6 4.65685 4.65685 6 3 6C1.34315 6 1.60169e-08 4.65685 3.57746e-08 3C5.55324e-08 1.34315 1.34315 -4.6082e-07 3 -4.41063e-07ZM13 1.55023e-07C14.6569 1.74781e-07 16 1.34315 16 3C16 4.65685 14.6569 6 13 6C11.3431 6 10 4.65685 10 3C10 1.34315 11.3431 1.35266e-07 13 1.55023e-07ZM26 3C26 1.34315 24.6569 -1.82807e-07 23 -2.02565e-07C21.3431 -2.22323e-07 20 1.34315 20 3C20 4.65685 21.3431 6 23 6C24.6569 6 26 4.65685 26 3Z"
                              fill="#000000"/>
                    </svg>
                </div>
                <div className={`${styles.pencil} ${openedKebab ? styles.closedOptions : styles.openedOptions}`}
                     onClick={pencilClickHandler}>
                    <svg width="26" height="26"
                         viewBox="0 0 19 19" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd"
                              d="M6.25175 0.837532C5.47746 0.0632403 4.49514 -0.115265 3.59853 0.0640591C2.73683 0.236397 1.94243 0.732641 1.33753 1.33753C0.732643 1.94242 0.236398 2.73683 0.0640594 3.59852C-0.115265 4.49514 0.0632406 5.47745 0.837532 6.25174L10.3375 15.7517C10.4473 15.8615 10.5811 15.9442 10.7284 15.9933L16.7284 17.9933C17.0878 18.1131 17.4839 18.0196 17.7518 17.7517C18.0196 17.4839 18.1131 17.0877 17.9933 16.7284L15.9933 10.7284C15.9442 10.5811 15.8615 10.4473 15.7517 10.3375L6.25175 0.837532ZM2.25175 4.83753C2.02604 4.61182 1.95454 4.34413 2.02522 3.99075C2.10288 3.60245 2.35664 3.14685 2.75175 2.75175C3.14686 2.35664 3.60245 2.10288 3.99076 2.02522C4.34414 1.95454 4.61183 2.02604 4.83753 2.25174L5.63043 3.04464L3.04464 5.63043L2.25175 4.83753ZM4.45886 7.04464L11.5848 14.1706L15.4635 15.4635L14.1706 11.5848L7.04464 4.45885L4.45886 7.04464Z"
                              fill="#FFFFFF"/>
                    </svg>
                </div>
                <div className={`${styles.trashCan} ${openedKebab ? styles.closedOptions : styles.openedOptions}`}
                     onClick={() => DeleteProduct(props.product.id)}>
                    <svg width="20"
                         height="26" viewBox="0 0 14 18"
                         fill="none">
                        <path fillRule="evenodd" clipRule="evenodd"
                              d="M6.44152 0C5.15023 0 4.00381 0.82629 3.59547 2.05132L3.27924 3H2H1C0.447715 3 0 3.44772 0 4C0 4.55228 0.447715 5 1 5V17C1 17.5523 1.44772 18 2 18H12C12.5523 18 13 17.5523 13 17V5C13.5523 5 14 4.55228 14 4C14 3.44772 13.5523 3 13 3H12H10.7208L10.4045 2.05132C9.99619 0.82629 8.84977 0 7.55848 0H6.44152ZM11 5H10H4H3V16H11V5ZM8.61257 3L8.50716 2.68377C8.37105 2.27543 7.98891 2 7.55848 2H6.44152C6.01109 2 5.62895 2.27543 5.49284 2.68377L5.38743 3H8.61257Z"
                              fill="#FFFFFF"/>
                    </svg>
                </div>
            </div>

        </div>
    );
};
