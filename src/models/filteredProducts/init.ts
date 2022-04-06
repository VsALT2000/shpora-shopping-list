import {sample} from "effector";
import {$store} from "../allProducts/ProductsStore";
import {$activeFilters, ApplyFilters} from "./FilteredProductStore";

sample({
    clock: $store,
    source: $activeFilters,
    fn: (sourceData, clockData) => ({filters: sourceData, state: clockData}),
    target: ApplyFilters,
})

sample({
    clock: $activeFilters,
    source: $store,
    fn: (sourceData, clockData) => ({filters: clockData, state: sourceData}),
    target: ApplyFilters,
})
