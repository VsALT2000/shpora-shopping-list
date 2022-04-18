import { createEvent, createStore, sample } from "effector";
import { ProductsListType } from "../../types/types";
import { AddNewProduct, DeleteProduct } from "../allProducts/ProductsStore";
import { AddProductByListIdType, ProductInListType } from "../../types/types";

export const AddNewList = createEvent<ProductsListType>("AddNewList");

export const AddProductToList = createEvent<AddProductByListIdType>("AddProductToList");

export const DeleteProductFromList = createEvent<ProductInListType>("DeleteProductFromList");

export const ArchiveList = createEvent<number>("ArchiveList");

export const MarkProductAsBought = createEvent<ProductInListType>("MarkProductAsBought");

export const $listsStore = createStore<ProductsListType[]>([]);

$listsStore
    .on(AddNewList, (state, list: ProductsListType) => [...state, list])
    .on(ArchiveList, (state, listId: number) => {
        const newState = state.slice();
        const list = newState.find((list) => list.id === listId);
        if (!!list) list.archived = !list.archived;
        return newState;
    })
    .on(AddProductToList, (state, {product, listId}) => {
        const newState = state.slice();
        const list = newState.find((list) => list.id === listId);
        if (!!list) {
            list.pendingProducts.push(product.id);
            AddNewProduct(product);
        }
        return newState;
    })
    .on(DeleteProductFromList, (state, {listId, productId}) => {
        const newState = state.slice();
        const list = newState.find((list) => list.id === listId);
        if (!!list) {
            list.pendingProducts = list.pendingProducts.filter((id) => id !== productId);
            DeleteProduct(productId);
        }
        return newState;
    })
    .on(MarkProductAsBought, (state, {listId, productId}) => {
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

