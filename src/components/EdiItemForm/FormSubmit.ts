import {EditProductType, ProductType, ShopType} from "../../types/types";
import {EditProduct} from "../../models/allProducts/ProductsStore";
import {ChangeFilter} from "../../models/filteredProducts/FilteredProductStore";
import {ValuesType} from "./EditItemForm";
import { AddProductToList } from "../../models/productsList/ProductsListStore";


export const formSubmit = (values: ValuesType, editForm: boolean, priceToggle: boolean, onCloseForm: () => void, listId: number) => {
    values.shop = values.shop === "Не выбрано" ? "" : values.shop;
    if(priceToggle){
        values.cost = Number(values.price) * Number(values.amount);
    }else{
        values.cost = Number(values.price);
        values.price = '';
    }

    if (editForm) {
        const payload: Partial<Omit<ProductType, "id" | "date" | "bought">> = {};
        if (!!values.name) payload.name = values.name;
        if (!!values.amount) payload.amount = Number(values.amount);
        payload.price = Number(values.price) || undefined;
        payload.cost = values.cost;
        payload.shop = values.shop as ShopType || undefined;
        payload.unit = values.unit;

        const product: EditProductType = {
            id: values.id,
            payload: payload,
        }
        EditProduct(product);
        onCloseForm();
    } else {
        const product: ProductType = {
            id: values.id,
            name: values.name,
            amount: Number(values.amount),
            price: Number(values.price) || undefined,
            cost: Number(values.cost),
            shop: values.shop as ShopType || undefined,
            unit: values.unit,
            bought: false,
            date: new Date(),
        }
        AddProductToList({product, listId});
        ChangeFilter([]);
        onCloseForm();
    }
}