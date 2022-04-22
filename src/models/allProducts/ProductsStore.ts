import {createEvent, createStore} from "effector";
import {EditProductType, ProductType} from "../../types/types";

export const AddNewProduct = createEvent<ProductType>("AddNewProduct");

export const DeleteProducts = createEvent<number[]>("DeleteProduct");

export const EditProduct = createEvent<EditProductType>("EditProduct");

export const $productsStore = createStore<ProductType[]>([]);

$productsStore
    .on(AddNewProduct, (state, product: ProductType) => [...state, product])
    .on(DeleteProducts, (state, productsId: number[]) => {
        return state.filter(product => !productsId.includes(product.id));
    })
    .on(EditProduct, (state, newProduct: EditProductType) => {
        const newState = state.slice();
        const productIndex = newState.findIndex(product => product.id === newProduct.id)
        if (productIndex !== -1) {
            const payload = newProduct.payload
            const fields = Object.keys(payload);
            for (const field of fields) {
                // @ts-ignore Сделал так для расширяемости
                newState[productIndex][field] = payload[field];
            }
        }
        return newState;
    })
