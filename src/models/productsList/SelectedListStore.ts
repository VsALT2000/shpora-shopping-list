import { ProductType } from "../../types/types";
import { $store } from "../allProducts/ProductsStore";
import { createEvent, createStore, sample } from "effector";
import {$listsStore} from './ProductsListStore'

export const SelectList = createEvent<number>("SelectList");
export const ApplyListId = createEvent<{ state: ProductType[]; listId: number }>("ApplyFilters");
export const $products = createStore<ProductType[]>($store.defaultState);
export const $selectedList = createStore<number>(0);

$selectedList.on(SelectList, (state, listId) => listId);

$products.on(ApplyListId, (_, newState) => {
    const list = $listsStore.getState().find((list) => list.id === newState.listId)
    if (!!list) {
        const ids = [...list.boughtProducts, ...list.pendingProducts];
        return newState.state.filter((product) => ids.includes(product.id))}
    else {
        return [];
    }
});

sample({
    clock: $store,
    source: $selectedList,
    fn: (sourceData, clockData) => ({ listId: sourceData, state: clockData }),
    target: ApplyListId,
});

sample({
    clock: $selectedList,
    source: $store,
    fn: (sourceData, clockData) => ({ listId: clockData, state: sourceData }),
    target: ApplyListId,
});
