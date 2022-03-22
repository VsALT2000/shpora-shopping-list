import {createEvent, createStore} from "effector";
import {EditProductType, ProductType} from "../types/types";

export const AddNewProduct = createEvent<ProductType>("AddNewProduct");
AddNewProduct.watch(product => console.log(product));

export const BuyingProduct = createEvent<number>("BuyingProduct");
BuyingProduct.watch(product => console.log(product));

export const DeleteProduct = createEvent<number>("DeleteProduct");
DeleteProduct.watch(product => console.log(product));

export const EditProduct = createEvent<EditProductType>("EditProduct");
EditProduct.watch(product => console.log(product));

export const Products = createStore<ProductType[]>([]);

Products
    .on(AddNewProduct, (state, product: ProductType) => [...state, product])
    .on(BuyingProduct, (state, productId: number) => {
        const newState:ProductType[] = state.slice();
        const product = newState.find(product => product.id === productId)
        if (!!product)
            product.bought = !product.bought;
        return newState;
    })
    .on(DeleteProduct, (state, productId: number) => {
        return state.filter(product => product.id !== productId);
    })
    .on(EditProduct, (state, newProduct: EditProductType) => {
        const newState:ProductType[] = state.slice();
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
    .watch(products => console.log(products));
