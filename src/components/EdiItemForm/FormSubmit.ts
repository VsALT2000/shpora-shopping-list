import {EditProductType, ProductType, ShopType} from "../../types/types";
import {AddNewProduct, EditProduct} from "../../models/allProducts/ProductsStore";
import {ChangeFilter} from "../../models/filteredProducts/FilteredProductStore";
import {ValuesType} from "./EditItemForm";

export const FormSubmit = (values: ValuesType, editForm: boolean, onCloseForm: () => void) => {
    values.shop = values.shop === "Не выбрано" ? "" : values.shop;
    if (editForm) {
        const payload: Partial<Omit<ProductType, "id" | "date" | "bought">> = {};
        if (!!values.name) payload.name = values.name;
        if (!!values.amount) payload.amount = Number(values.amount);
        payload.price = Number(values.price) || undefined;
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
            shop: values.shop as ShopType || undefined,
            unit: values.unit,
            bought: false,
            date: new Date(),
        }
        AddNewProduct(product);
        ChangeFilter([]);
        onCloseForm();
    }
}