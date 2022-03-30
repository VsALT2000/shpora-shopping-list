import {createEvent, createStore} from "effector";
import {LocalStoreType} from "../types/types";
import {$allProducts} from "./ProductsStore";

export const localStore = <Type>(defaultState: Type, key: string): LocalStoreType<Type> => {

    const update = createEvent<string | null>();
    const state = JSON.parse(window.localStorage.getItem(key) || JSON.stringify(defaultState));
    const store = createStore<Type>(state);
    store.on(update, (_, localItem) => JSON.parse(localItem || JSON.stringify(defaultState)));

    const updateFromLocalStore = () => {
        const localItem = window.localStorage.getItem(key);
        if (JSON.stringify(store.getState()) !== localItem)
            try {
                update(localItem);
            } catch (e) {
                console.error(e);
            }
    }
    const uploadToLocalStore = () => {
        if (JSON.stringify(store.getState()) !== window.localStorage.getItem(key))
            window.localStorage.setItem(key, JSON.stringify(store.getState()));
    }

    return {store, updateFromLocalStore, uploadToLocalStore};
}