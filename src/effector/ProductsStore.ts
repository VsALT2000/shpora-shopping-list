import {createEvent, createStore} from "effector";
import {ProductType} from "../types/types";

export const AddNewProduct = createEvent<ProductType>("AddNewProduct");
AddNewProduct.watch(product => console.log(product));

export const BuyingProduct = createEvent<number>("BuyingProduct");
BuyingProduct.watch(product => console.log(product));

export const DeleteProduct = createEvent<number>("DeleteProduct");
DeleteProduct.watch(product => console.log(product));

export const EditProduct = createEvent<ProductType>("EditProduct");
EditProduct.watch(product => console.log(product));

export const Products = createStore<ProductType[]>([
    {
        name: "Лук",
        id: 0,
        price: 10,
        shop: "Магнит",
        date: new Date(2022, 2, 20),
        amount: 1,
        bought: false,
    },
    {
        name: "Груша",
        id: 1,
        date: new Date(2022, 2, 17),
        amount: 1,
        bought: true,
    },
]);

Products
    .on(AddNewProduct, (state, product: ProductType) => [...state, product])
    .on(BuyingProduct, (state, productId: number) => {
        const newState = state.slice();
        const product = newState.find(product => product.id === productId)
        if (!!product)
            product.bought = !product.bought;
        return newState;
    })
    .on(DeleteProduct, (state, productId: number) => {
        const newState = state.slice();
        return newState.filter(product => product.id !== productId);
    })
    .on(EditProduct, (state, newProduct: ProductType) => {
        const newState = state.slice();
        const productIndex = newState.findIndex(product => product.id === newProduct.id)
        if (productIndex !== -1)
            newState[productIndex] = newProduct;
        return newState;
    })
    .watch(products => console.log(products));
