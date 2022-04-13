import { createEvent, createStore } from "effector";
import { ProductsListType } from "../../types/types";
import {AddProductType} from "../../types/types";

export const AddNewList = createEvent<ProductsListType>("AddNewList");

export const AddProduct = createEvent<AddProductType>("AddProduct");

export const ArchiveList = createEvent<number>("ArchiveList");

export const $store = createStore<ProductsListType[]>([]);

$store
    .on(AddNewList, (state, list: ProductsListType) => [...state, list])
    .on(ArchiveList, (state, listId: number) => {
        const newState = state.slice();
        const list = newState.find((list) => list.id === listId);
        if (!!list) list.archived = !list.archived;
        return newState;
    })

