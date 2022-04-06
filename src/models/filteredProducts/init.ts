import {sample} from "effector";
import {$allProducts} from "../allProducts/ProductsStore";
import {$activeFilters, ApplyFilters} from "./FilteredProductStore";

ApplyFilters({filters: $activeFilters.getState(), state: $allProducts.getState()});

sample({
    clock: $allProducts,
    source: $activeFilters,
    fn: (sourceData, clockData) => ({filters: sourceData, state: clockData}),
    target: ApplyFilters,
})

sample({
    clock: $activeFilters,
    source: $allProducts,
    fn: (sourceData, clockData) => ({filters: clockData, state: sourceData}),
    target: ApplyFilters,
})
