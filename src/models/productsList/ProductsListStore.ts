import {createEvent, createStore} from "effector";
import {AddProductByListIdType, ProductInListType, ProductsListType} from "../../types/types";

export const AddNewList = createEvent<ProductsListType>("AddNewList");

export const DeleteList = createEvent<{ listId: number, productsId: number[] }>("DeleteList");

export const AddProductToList = createEvent<AddProductByListIdType>("AddProductToList");

export const DeleteProductFromList = createEvent<ProductInListType>("DeleteProductFromList");

export const ToggleProductBoughtState = createEvent<ProductInListType>("ToggleProductBoughtState");

export const $listsStore = createStore<Map<number, ProductsListType>>(new Map<number, ProductsListType>());

$listsStore
    .on(AddNewList, (state, list: ProductsListType) => {
        const newState = new Map(state);
        newState.set(list.id, list);
        return newState;
    })
    .on(DeleteList, (state, {listId, productsId}) => {
        const newState = new Map(state);
        newState.delete(listId);
        return newState;
    })
    .on(AddProductToList, (state, {product, listId}) => {
        const newState = new Map(state);
        const list = newState.get(listId);
        if (!!list) {
            list.pendingProducts.push(product.id);
        }
        return newState;
    })
    .on(DeleteProductFromList, (state, {listId, productId}) => {
        const newState = new Map(state);
        const list = newState.get(listId);
        if (!!list) {
            list.pendingProducts = list.pendingProducts.filter((id) => id !== productId);
        }
        return newState;
    })
    .on(ToggleProductBoughtState, (state, {listId, productId}) => {
        const newState = new Map(state);
        const list = newState.get(listId);
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
    })
