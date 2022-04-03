import { useState } from "react";
import garbage from "../../../images/garbage.svg";
import pencil from "../../../images/pencil.svg";
import styles from "./Actions.module.css";
import { EditItemForm } from "../../../EdiItemForm/EditItemForm";
import kebab from "../../../images/kebab.svg";
import { DeleteProduct } from "../../../../effector/ProductsStore";

type ActionsProps = {
    productId: number;
};

export const Actions: React.FC<ActionsProps> = (props) => {
    const [openedKebab, setOpenedKebab] = useState(true);

    const closeKebab = (event: any) => {
        console.log(event);
        setOpenedKebab(true);
        window.removeEventListener("click", closeKebab);
    };

    const clickKebabHandler = (event: any) => {
        setOpenedKebab(false);
        window.addEventListener("click", closeKebab);
        event.stopPropagation();
    };

    const garbageClickHandler = () => {
        DeleteProduct(props.productId);
    };

    return (
        <div>
            {openedKebab ? (
                <div className={styles.kebab}>
                   <img src={kebab} onClick={clickKebabHandler} /> 
                </div>
            ) : (
                <div className={styles.actions}>
                    <img src={pencil} width="26px" />
                    <img src={garbage} width="26px" onClick={garbageClickHandler} />
                </div>
            )}
        </div>
    );
};
