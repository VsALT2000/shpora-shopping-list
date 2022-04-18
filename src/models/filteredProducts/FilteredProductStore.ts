import {createEvent, createStore} from "effector";
import {ProductType, ShopType} from "../../types/types";
import {$store} from "../allProducts/ProductsStore";

export const ChangeFilter = createEvent<ShopType[]>("ChangeFilter");
export const ApplyFilters = createEvent<{state: ProductType[], filters: ShopType[]}>("ApplyFilters");

export const $products = createStore<ProductType[]>($store.defaultState);
export const $activeFilters = createStore<ShopType[]>([]);

$activeFilters
    .on(ChangeFilter, (state, newFilters) => newFilters);
