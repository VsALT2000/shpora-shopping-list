import { useState } from "react";
import garbage from "../../../images/garbage.svg";
import pencil from "../../../images/pencil.svg";
import styles from "./Actions.module.css";
import { EditItemForm } from "../../../EdiItemForm/EditItemForm";
import kebab from "../../../images/kebab.svg";
import { DeleteProduct } from "../../../../effector/ProductsStore";
import { ProductType } from "../../../../types/types";

type ActionsProps = {
    product: ProductType; 
};

export const Actions: React.FC<ActionsProps> = (props) => {
    const [openedKebab, setOpenedKebab] = useState(true);
    const [openedForm, setOpenedForm] = useState<boolean>(false);



    const closeKebab = (event: any) => {
        setOpenedKebab(true);
        window.removeEventListener("click", closeKebab);
    };

    const clickKebabHandler = (event: any) => {
        setOpenedKebab(false);
        window.addEventListener("click", closeKebab);
        event.stopPropagation();
    };

    const garbageClickHandler = () => {
        DeleteProduct(props.product.id);
    };

    const pencilClickHandler = () => {
        setOpenedForm(true);
        console.log('Открываем форму')
    }

    const closeFormHandler = () => {
        setOpenedForm(false);
        console.log('закрываем форму')
    };

    

    return (
        <div>
            {openedForm && <EditItemForm onCloseForm={closeFormHandler} productData={props.product}/>}
            {openedKebab ? (
                <div className={styles.kebab}>
                   <img src={kebab} onClick={clickKebabHandler} /> 
                </div>
            ) : (
                <div className={styles.actions}>
                    <img src={pencil} width="26px" onClick={pencilClickHandler}/>
                    <img src={garbage} width="26px" onClick={garbageClickHandler} />
                </div>
                
            )}
        </div>
    );
};
