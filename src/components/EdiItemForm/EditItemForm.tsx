import styles from "./EditItemForm.less";
import { Button } from "../UI/Button";
import { ProductType, ShopType, UnitType } from "../../types/types";
import { useEffect, useState } from "react";
import { AddNewProduct, EditProduct } from "../../models/allProducts/ProductsStore";
import {ChangeFilter} from "../../models/filteredProducts/FilteredProductStore"
import { $NewProductId } from "../../models/allProducts/ProductsCountStore";
import { useStore } from "effector-react";
import { isValidAmount } from "../../utils/Utils";

interface EditItemFormProps {
    onCloseForm: () => void;
    productData?: ProductType;
}

export const EditItemForm: React.FC<EditItemFormProps> = (props) => {

    const [editForm, setEditForm] = useState(false);

    const newProductId = useStore($NewProductId);

    const [product, setProduct] = useState<ProductType>({
        name: "",
        id: newProductId,
        date: new Date(),
        amount: 1,
        bought: false,
        price: undefined,
    });

    const addNewProductHandler = (event: React.SyntheticEvent) => {
        event.preventDefault();
        AddNewProduct(product);
        ChangeFilter([]);
        props.onCloseForm();
    };

    const editProductHandler = (event: React.SyntheticEvent) => {
        event.preventDefault();
        EditProduct({
            id: product.id,
            payload: {
                name: product.name,
                price: product.price,
                shop: product.shop,
                amount: product.amount,
                unit: product.unit,
            },
        });
        props.onCloseForm();
    };

    useEffect(() => {
        if (props.productData) {
            setProduct(props.productData);
            setEditForm(true);
        }
    }, []);

    const [amountError, setAmountError] = useState(false);

    const nameChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProduct((prevState) => {
            return { ...prevState, name: event.target.value };
        });
    };

    const amountChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (isValidAmount(event.target.value)) {
            setAmountError(false);
        } else {
            setAmountError(true);
        }
        setProduct((prevState) => {
            return { ...prevState, amount: Number(event.target.value) };
        });
    };

    const priceChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.length > 0) {
            setProduct((prevState) => {
                return { ...prevState, price: Number(event.target.value) };
            });
        } else {
            setProduct((prevState) => {
                return { ...prevState, price: undefined };
            });
        }
    };

    const selectShopHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
        if (Object.keys(ShopType).includes(event.target.value)) {
            setProduct((prevState) => {
                return { ...prevState, shop: ShopType[event.target.value as keyof typeof ShopType] };
            });
        } else {
            setProduct((prevState) => {
                return { ...prevState, shop: undefined };
            });
        }
    };

    const selectUnitHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
        if (Object.keys(UnitType).includes(event.target.value)) {
            setProduct((prevState) => {
                return { ...prevState, unit: UnitType[event.target.value as keyof typeof UnitType] };
            });
        } else {
            setProduct((prevState) => {
                delete prevState.unit;
                return { ...prevState };
            });
        }
    };

    const backdropClickHandler = (event: React.SyntheticEvent) => {
        event.stopPropagation();
        props.onCloseForm();
    };

    let selectedShop: string | undefined;
    if (product.shop) {
        selectedShop = Object.keys(ShopType).find((key) => ShopType[key as keyof typeof ShopType] === product.shop);
    }

    let selectedUnits: string | undefined;
    if (product.unit) {
        selectedUnits = Object.keys(UnitType).find((key) => UnitType[key as keyof typeof UnitType] === product.unit);
    }

    
    return (
        <div className={styles.background}>
            <form className={styles.closedForm} onSubmit={editForm ? editProductHandler : addNewProductHandler}>
                <div className={styles.editItemForm}>
                    <h1>{editForm ?"Редактирование": "Добавить товар" }</h1>
                    <label>*Название</label>
                    <input type="text" value={product.name} onChange={nameChangeHandler} />

                    <label>*Кол-во</label>
                    <input className={`${amountError && styles.error}`} type="number" value={product.amount} onChange={amountChangeHandler} />

                    <label>Единицы измерения</label>
                    <select onChange={selectUnitHandler} value={selectedUnits}>
                        <option>Выбери</option>
                        {Object.keys(UnitType).map((key) => (
                            <option value={key} key={key}>
                                {UnitType[key as keyof typeof UnitType]}
                            </option>
                        ))}
                    </select>

                    <label>Цена за единицу</label>
                    <input type="number" value={product.price ? product.price : ''} onChange={priceChangeHandler} step="0.01" />

                    <label>Магазин</label>
                    <select onChange={selectShopHandler} value={selectedShop}>
                        <option value={"none"}>Выбери</option>
                        {Object.keys(ShopType).map((key) => (
                            <option value={key} key={key}>
                                {ShopType[key as keyof typeof ShopType]}
                            </option>
                        ))}
                    </select>
                    <Button name={editForm ? 'Применить': 'Добавить'} />
                </div>
            </form>
            <div className={styles.backdrop} onClick={backdropClickHandler}></div>
        </div>
    );
};
