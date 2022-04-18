import { createEvent, createStore, sample } from "effector";
import { ProductsListType } from "../../types/types";
import { AddNewProduct, DeleteProduct } from "../allProducts/ProductsStore";
import { ProductType } from "../../types/types";
import { $selectedList } from "./SelectedListStore";

export const AddNewList = createEvent<ProductsListType>("AddNewList");

export const AddProductToList = createEvent<ProductType>("AddProductToList");

export const DeleteProductFromList = createEvent<number>("DeleteProductFromList");

export const ArchiveList = createEvent<number>("ArchiveList");

export const MarkProductAsBought = createEvent<number>("MarkProductAsBought");

export const $listsStore = createStore<ProductsListType[]>([]);

$listsStore
    .on(AddNewList, (state, list: ProductsListType) => [...state, list])
    .on(ArchiveList, (state, listId: number) => {
        const newState = state.slice();
        const list = newState.find((list) => list.id === listId);
        if (!!list) list.archived = !list.archived;
        return newState;
    })
    .on(AddProductToList, (state, product: ProductType) => {
        const newState = state.slice();
        const selectedListId = $selectedList.getState();
        const list = newState.find((list) => list.id === selectedListId);
        if (!!list) {
            list.pendingProducts.push(product.id);
            AddNewProduct(product);
        }
        return newState;
    })
    .on(DeleteProductFromList, (state, productId: number) => {
        const newState = state.slice();
        const selectedListId = $selectedList.getState();
        const list = newState.find((list) => list.id === selectedListId);
        if (!!list) {
            list.pendingProducts = list.pendingProducts.filter((id) => id !== productId);
            DeleteProduct(productId);
        }
        return newState;
    })
    .on(MarkProductAsBought, (state, productId: number) => {
        const newState = state.slice();
        const selectedListId = $selectedList.getState();
        const list = newState.find((list) => list.id === selectedListId);
        if (!!list) {
            if (list.boughtProducts.includes(productId)) {
                list.pendingProducts.push(productId);
                list.boughtProducts.filter((product) => product !== productId);
            } else {
                list.boughtProducts.push(productId);
                list.pendingProducts.filter((product) => product !== productId);
            }
        }
        return newState;
    });

