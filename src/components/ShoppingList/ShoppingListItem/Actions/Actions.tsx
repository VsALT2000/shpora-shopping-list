import { useState } from "react";
import garbage from "../../../images/garbage.svg";
import pencil from "../../../images/pencil.svg";
import styles from "./Actions.module.css";
import { EditItemForm } from "../../../EdiItemForm/EditItemForm";
import kebab from "../../../images/kebab.svg";
import { DeleteProduct } from "../../../../models/allProducts/ProductsStore";
import { ProductType } from "../../../../types/types";

interface ActionsProps  {
    product: ProductType; 
};

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
        <div>
            {openedForm && <EditItemForm onCloseForm={closeFormHandler} productData={props.product}/>}
            {openedKebab ? (
                <div className={styles.kebab}>
                   <img src={kebab} onClick={clickKebabHandler} /> 
                </div>
            ) : (
                <div className={styles.actions}>
                    <img src={pencil} width="26px" onClick={pencilClickHandler}/>
                    <img src={garbage} width="26px" onClick={() => DeleteProduct(props.product.id)} />
                </div>
                
            )}
        </div>
    );
};
