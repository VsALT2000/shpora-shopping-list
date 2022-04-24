import {createEvent, createStore} from "effector";
import {EditProductType, ProductType} from "../../types/types";

export const AddNewProduct = createEvent<ProductType>("AddNewProduct");

export const DeleteProducts = createEvent<number[]>("DeleteProduct");

export const EditProduct = createEvent<EditProductType>("EditProduct");

export const $productsStore = createStore <Map<number, ProductType>>(new Map<number, ProductType>());

$productsStore
    .on(AddNewProduct, (state, product: ProductType) => {
        const newState = new Map(state);
        newState.set(product.id, product);
        return newState;
    })
    .on(DeleteProducts, (state, productsId: number[]) => {
        const newState = new Map(state);
        productsId.forEach((id) => newState.delete(id));
        return newState;
    })
    .on(EditProduct, (state, newProduct: EditProductType) => {
        const newState = new Map(state);
        if (newState.has(newProduct.id)) {
            const payload = newProduct.payload
            const fields = Object.keys(payload);
            const product = newState.get(newProduct.id)
            for (const field of fields) {
                // @ts-ignore Сделал так для расширяемости
                product[field] = payload[field];
            }
        }
        return newState;
    })
