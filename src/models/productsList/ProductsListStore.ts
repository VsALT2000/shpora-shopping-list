import {createEvent, createStore, sample} from "effector";
import {AddProductByListIdType, ProductInListType, ProductsListType} from "../../types/types";

export const AddNewList = createEvent<ProductsListType>("AddNewList");

export const DeleteList = createEvent<{ listId: number, productsId: number[] }>("DeleteList");

export const AddProductToList = createEvent<AddProductByListIdType>("AddProductToList");

export const DeleteProductFromList = createEvent<ProductInListType>("DeleteProductFromList");

export const ToggleProductBoughtState = createEvent<ProductInListType>("ToggleProductBoughtState");

export const ReadListsStoreFromLS = createEvent<void>("ReadListsStore");

const WriteToLS = createEvent<void>("WriteListsStore");

export const $listsStore = createStore<ProductsListType[]>([]);

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
    })
    .on(ReadListsStoreFromLS, (_) => {
            const stored = window.localStorage.getItem("listsStore");
            return stored ? JSON.parse(stored) : [];
        }
    )
    .on(WriteToLS, (store) => {
            window.localStorage.setItem("listsStore", JSON.stringify(store));
        }
    );

ReadListsStoreFromLS();

sample({
    clock: $listsStore,
    target: WriteToLS,
})
