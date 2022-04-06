import {createEvent, createStore} from "effector";
import {EditProductType, ProductType, UnitType} from "../../types/types";

export const AddNewProduct = createEvent<ProductType>("AddNewProduct");

export const BuyingProduct = createEvent<number>("BuyingProduct");

export const DeleteProduct = createEvent<number>("DeleteProduct");

export const EditProduct = createEvent<EditProductType>("EditProduct");

export const $store = createStore<ProductType[]>([]);

$store
    .on(AddNewProduct, (state, product: ProductType) => {
        product.unit = product.unit === undefined ? UnitType.piece : product.unit;
        return [...state, product];
    })
    .on(BuyingProduct, (state, productId: number) => {
        const newState = state.slice();
        const product = newState.find(product => product.id === productId)
        if (!!product)
            product.bought = !product.bought;
        return newState;
    })
    .on(DeleteProduct, (state, productId: number) => {
        return state.filter(product => product.id !== productId);
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
    });
