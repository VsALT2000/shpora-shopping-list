import {createEvent, createStore} from "effector";
import {ProductType, ShopType} from "../../types/types";
import {$allProducts} from "../allProducts/ProductsStore";

export const ChangeFilter = createEvent<ShopType[]>("ChangeFilter");
export const ApplyFilters = createEvent<{state: ProductType[], filters: ShopType[]}>("ApplyFilters");

export const $filteredProducts = createStore<ProductType[]>($allProducts.defaultState);

const defaultState = JSON.parse(window.localStorage.getItem("activeFilters") || "[]");
export const $activeFilters = createStore<ShopType[]>(defaultState);

$activeFilters
    .on(ChangeFilter, (state, newFilters) => newFilters);

const CheckAllFilter = (product:ProductType, filters:ShopType[]) => !!product.shop && filters.includes(product.shop);

$filteredProducts
    .on(ApplyFilters, (_, newState) => {
        return newState.filters.length
            ? newState.state.filter(product => CheckAllFilter(product, newState.filters))
            : newState.state
    });
