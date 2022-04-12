import styles from "./EditItemForm.less";
import {ProductType, ShopType, UnitType} from "../../types/types";
import React, {useEffect, useState} from "react";
import {$NewProductId} from "../../models/allProducts/ProductsCountStore";
import {useStore} from "effector-react";
import Modal from "../Common/Modal/Modal";
import Input from "../Common/FormControl/Input";
import {Form, Formik} from "formik";
import {FormSubmit} from "./FormSubmit";
import {Validate} from "./FormValidate";
import Select from "../Common/FormControl/Select";

interface EditItemFormProps {
    onCloseForm: () => void;
    productData?: ProductType;
}

export type ValuesType = {
    name: string,
    id: number,
    amount: number | string,
    price: number | string,
    shop: string,
    unit: UnitType,
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
        id: props.productData?.id || newProductId,
        amount: props.productData?.amount || '',
        price: props.productData?.price || '',
        shop: props.productData?.shop || "",
        unit: props.productData?.unit || UnitType.piece,
    }

    return (
        <Formik onSubmit={(values => FormSubmit(values, editForm, props.onCloseForm))} initialValues={initialValues}
                validate={(values) => Validate(values, editForm)}>
            <Form>
                <Modal
                    header={editForm ? "Редактирование" : "Добавить товар"}
                    nameButton={editForm ? 'Применить' : 'Добавить'}
                    onAbort={backdropClickHandler}
                >
                    <div className={styles.editItemForm}>
                        <label>{editForm ? "" : "*"}Название</label>
                        <Input type="text" name="name"/>
                        <label>{editForm ? "" : "*"}Кол-во</label>
                        <Input name="amount" type="number" min={1} step={1}/>
                        <label>Единицы измерения</label>
                        <Select name="unit">
                            {Object.values(UnitType).map((value) => (
                                <option value={value} key={value}>
                                    {value}
                                </option>
                            ))}
                        </Select>
                        <label>Цена за единицу</label>
                        <Input type="number" name="price" min={0.01} step={0.01}/>
                        <label>Магазин</label>
                        <Select name="shop">
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
