import styles from "./EditItemForm.less";
import {ProductType, ShopType, UnitType} from "../../types/types";
import React, {useEffect, useRef, useState} from "react";
import {AddNewProduct, EditProduct} from "../../models/allProducts/ProductsStore";
import {ChangeFilter} from "../../models/filteredProducts/FilteredProductStore"
import {$NewProductId} from "../../models/allProducts/ProductsCountStore";
import {useStore} from "effector-react";
import Modal from "../Common/Modal/Modal";

interface EditItemFormProps {
    onCloseForm: () => void;
    productData?: ProductType;
}

export const EditItemForm: React.FC<EditItemFormProps> = (props) => {
    const [editForm, setEditForm] = useState(false);
    const newProductId = useStore($NewProductId);
    const name: React.RefObject<HTMLInputElement> = useRef(null);
    const amount: React.RefObject<HTMLInputElement> = useRef(null);
    const price: React.RefObject<HTMLInputElement> = useRef(null);
    const shop: React.RefObject<HTMLSelectElement> = useRef(null);
    const unit: React.RefObject<HTMLSelectElement> = useRef(null);

    const addNewProductHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const product: ProductType = {
            name: name.current?.value ? name.current.value : "",
            id: newProductId,
            date: new Date(),
            amount: amount.current?.value ? Number(amount.current.value) : 0,
            bought: false,
            price: price.current?.value ? Number(price.current.value) : undefined,
            shop: shop.current?.value ? ShopType[shop.current.value as keyof typeof ShopType] : undefined,
            unit: unit.current?.value ? UnitType[unit.current.value as keyof typeof UnitType] : undefined,
        }
        AddNewProduct(product);
        ChangeFilter([]);
        props.onCloseForm();
    };

    const editProductHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (props.productData) {
            const payload: Partial<Omit<ProductType, "id" | "date" | "bought">> = {}
            if (!!name.current?.value) payload.name = name.current.value;
            if (!!amount.current?.value) payload.amount = Number(amount.current.value);
            if (!!price.current?.value) payload.price = Number(price.current.value);
            if (!!shop.current?.value) payload.shop = ShopType[shop.current.value as keyof typeof ShopType];
            if (!!unit.current?.value) payload.unit = UnitType[unit.current.value as keyof typeof UnitType];

            if (Object.keys(payload).length)
                EditProduct({
                    id: props.productData?.id,
                    payload: payload,
                });
        }
        props.onCloseForm();
    };

    useEffect(() => {
        if (props.productData) {
            setEditForm(true);
        }
    }, []);

    const backdropClickHandler = (event: React.SyntheticEvent) => {
        event.stopPropagation();
        props.onCloseForm();
    };

    let selectedShop = Object.keys(ShopType).find((key) => ShopType[key as keyof typeof ShopType] === props.productData?.shop);
    let selectedUnit = Object.keys(UnitType).find((key) => UnitType[key as keyof typeof UnitType] === props.productData?.unit);

    return (
        <form onSubmit={editForm ? editProductHandler : addNewProductHandler}>
            <Modal
                header={editForm ? "Редактирование" : "Добавить товар"}
                body={<div className={styles.editItemForm}>
                    <label>{editForm ? "" : "*"}Название</label>
                    <input type="text" ref={name} required={!editForm} defaultValue={props.productData?.name}/>
                    <label>{editForm ? "" : "*"}Кол-во</label>
                    <input type="number" min={1} step={1} ref={amount} defaultValue={props.productData?.amount}
                           required={!editForm}/>
                    <label>Единицы измерения</label>
                    <select ref={unit} defaultValue={selectedUnit}>
                        <option value={""}>Выбери</option>
                        {Object.keys(UnitType).map((key) => (
                            <option value={key} key={key}>
                                {UnitType[key as keyof typeof UnitType]}
                            </option>
                        ))}
                    </select>
                    <label>Цена за единицу</label>
                    <input type="number" ref={price} step="0.01" defaultValue={props.productData?.price}/>
                    <label>Магазин</label>
                    <select ref={shop} defaultValue={selectedShop}>
                        <option value={""}>Выбери</option>
                        {Object.keys(ShopType).map((key) => (
                            <option value={key} key={key}>
                                {ShopType[key as keyof typeof ShopType]}
                            </option>
                        ))}
                    </select>
                </div>}
                nameButton={editForm ? 'Применить' : 'Добавить'}
                onAbort={backdropClickHandler}
            />
        </form>
    );
};
