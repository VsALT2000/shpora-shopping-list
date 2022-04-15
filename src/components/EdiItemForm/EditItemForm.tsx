import styles from "./EditItemForm.less";
import {ProductType, ShopType, UnitType} from "../../types/types";
import React, {useEffect, useState} from "react";
import {$NewProductId} from "../../models/allProducts/ProductsCountStore";
import {useStore} from "effector-react";
import Modal from "../Common/Modal/Modal";
import Input from "../Common/FormControl/Input";
import {Form, Formik} from "formik";
import {formSubmit} from "./FormSubmit";
import {validate} from "./FormValidate";
import Select from "../Common/FormControl/Select";

interface EditItemFormProps {
    onCloseForm: () => void;
    productData?: ProductType;
}

export interface ValuesType {
    name: string;
    id: number;
    amount: number | string;
    price: number | string;
    shop: string;
    unit: UnitType;
}

export const EditItemForm: React.FC<EditItemFormProps> = (props) => {
    const [editForm, setEditForm] = useState(false);
    const newProductId = useStore($NewProductId);

    useEffect(() => {
        if (props.productData) {
            setEditForm(true);
        }
    }, []);

    const backdropClickHandler = (event: React.SyntheticEvent) => {
        event.stopPropagation();
        props.onCloseForm();
    };

    const initialValues = {
        name: props.productData?.name || '',
        id: props.productData === undefined ? newProductId : props.productData.id,
        amount: props.productData?.amount || '',
        price: props.productData?.price || '',
        shop: props.productData?.shop || "",
        unit: props.productData?.unit || UnitType.piece,
    }

    return (
        <Formik onSubmit={(values => formSubmit(values, editForm, props.onCloseForm))} initialValues={initialValues}
                validate={(values) => validate(values, editForm)}>
            <Form>
                <Modal
                    header={editForm ? "Редактирование" : "Добавить товар"}
                    nameButton={editForm ? 'Применить' : 'Добавить'}
                    onAbort={backdropClickHandler}
                >
                    <div className={styles.editItemForm}>
                        <Input name="name" label={`${editForm ? "" : "*"}Название`} type="text"/>
                        <Input name="amount" label={`${editForm ? "" : "*"}Кол-во`} type="number" min={1} step={1}/>
                        <Select name="unit" label={"Единицы измерения"}>
                            {Object.values(UnitType).map((value) => (
                                <option value={value} key={value}>
                                    {value}
                                </option>
                            ))}
                        </Select>
                        <Input name="price" label={"Цена за единицу"} type="number" min={0.01} step={0.01}/>
                        <Select name="shop" label={"Магазин"}>
                            <option value={"Не выбрано"}>Не выбрано</option>
                            {Object.values(ShopType).map((value) => (
                                <option value={value} key={value}>
                                    {value}
                                </option>
                            ))}
                        </Select>
                    </div>
                </Modal>
            </Form>
        </Formik>
    );
};
