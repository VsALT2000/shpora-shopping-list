import {ProductType, ShopType, UnitType} from "../../types/types";
import React, {useState} from "react";
import {$newProductId} from "../../models/allProducts/ProductsCountStore";
import {useStore} from "effector-react";
import Modal from "../Common/Modal/Modal";
import Input from "../Common/FormControl/Input";
import {Form, Formik} from "formik";
import {formSubmit} from "./FormSubmit";
import {validate} from "./FormValidate";
import Select from "../Common/FormControl/Select";
import styles from "./EditItemForm.less";
import cn from "classnames";

interface EditItemFormProps {
    editForm: boolean;
    onCloseForm: () => void;
    productData?: ProductType;
    listId: number;
}

export interface ValuesType {
    name: string;
    id: number;
    amount: number | string;
    price: number | string;
    cost: number;
    shop: string;
    unit: UnitType;
}

export const EditItemForm: React.FC<EditItemFormProps> = (props) => {
    const [priceToggle, setPriceToggle] = useState(!props.productData || !!props.productData.price);
    const newProductId = useStore($newProductId);

    const backdropClickHandler = (event: React.SyntheticEvent) => {
        event.stopPropagation();
        props.onCloseForm();
    };

    const initialValues = {
        name: props.productData?.name || "",
        id: props.productData === undefined ? newProductId : props.productData.id,
        amount: props.productData?.amount || "",
        cost: props.productData?.cost || 0,
        price: props.productData?.price || props.productData?.cost || "",
        shop: props.productData?.shop || "",
        unit: props.productData?.unit || UnitType.piece,
    };

    return (
        <Formik
            onSubmit={(values) => formSubmit(values, props.editForm, priceToggle, props.onCloseForm, props.listId)}
            initialValues={initialValues}
            validate={(values) => validate(values, props.editForm)}
        >
            <Form>
                <Modal header={props.editForm ? "Изменение товара" : "Добавить товар"}
                       nameButton={props.editForm ? "Сохранить" : "Добавить"} onAbort={backdropClickHandler}>
                    <div className={styles.editItemForm}>
                        <Input name="name" label={`${props.editForm ? "" : "*"}Название`} type="text"/>
                        <Input name="amount" label={`${props.editForm ? "" : "*"}Кол-во`} type="number" min={1}
                               step={1}/>
                        <Select name="unit" label={"Единицы измерения"}>
                            {Object.values(UnitType).map((value) => (
                                <option value={value} key={value}>
                                    {value}
                                </option>
                            ))}
                        </Select>
                        <Select name="shop" label={"Магазин"}>
                            <option value={"Не выбрано"}>Не выбрано</option>
                            {Object.values(ShopType).map((value) => (
                                <option value={value} key={value}>
                                    {value}
                                </option>
                            ))}
                        </Select>
                        <div>
                            <div className={styles.priceTabs}>
                                <div onClick={() => priceToggle || setPriceToggle(true)}
                                     className={cn({[styles.selectedTab]: priceToggle})}>
                                    Цена за единицу
                                </div>
                                <div onClick={() => !priceToggle || setPriceToggle(false)}
                                     className={cn({[styles.selectedTab]: !priceToggle})}>
                                    Стоимость
                                </div>
                            </div>
                            <Input styles={styles.priceInput} name="price" label={""} type="number" min={0.01}
                                   step={0.01}/>
                        </div>
                        
                    </div>
                </Modal>
            </Form>
        </Formik>
    );
};
