import {createEvent, createStore} from "effector";
import {AddProductByListIdType, ProductInListType, ProductsListType} from "../../types/types";

export const AddNewList = createEvent<ProductsListType>("AddNewList");

export const DeleteList = createEvent<{ listId: number, productsId: number[] }>("DeleteList");

export const AddProductToList = createEvent<AddProductByListIdType>("AddProductToList");

export const DeleteProductFromList = createEvent<ProductInListType>("DeleteProductFromList");

export const ToggleProductBoughtState = createEvent<ProductInListType>("ToggleProductBoughtState");

const defaultState = JSON.parse(window.localStorage.getItem("listsStore") || "[]");
export const $listsStore = createStore<ProductsListType[]>(defaultState);

$listsStore
    .on(AddNewList, (state, list: ProductsListType) => [...state, list])
    .on(DeleteList, (state, {listId, productsId}) => state.filter((list) => list.id !== listId))
    .on(AddProductToList, (state, {product, listId}) => {
        const newState = state.slice();
        const list = newState.find((list) => list.id === listId);
        if (!!list) {
            list.pendingProducts.push(product.id);
        }
        return newState;
    })
    .on(DeleteProductFromList, (state, {listId, productId}) => {
        const newState = state.slice();
        const list = newState.find((list) => list.id === listId);
        if (!!list) {
            list.pendingProducts = list.pendingProducts.filter((id) => id !== productId);
        }
        return newState;
    })
    .on(ToggleProductBoughtState, (state, {listId, productId}) => {
        const newState = state.slice();
        const list = newState.find((list) => list.id === listId);
        if (!!list) {
            if (list.boughtProducts.includes(productId)) {
                list.pendingProducts.push(productId);
                list.boughtProducts = list.boughtProducts.filter((id) => id !== productId);
            } else {
                list.boughtProducts.push(productId);
                list.pendingProducts = list.pendingProducts.filter((id) => id !== productId);
            }
        }
        return newState;
    });
