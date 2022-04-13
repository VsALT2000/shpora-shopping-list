import { createEvent, createStore } from "effector";
import { $products } from "../filteredProducts/FilteredProductStore";

export const $TotalSumStore = createStore<number>(0);
export const GetTotalSum = createEvent<void>("GetTotalSum");

$TotalSumStore
    .on(GetTotalSum, () => {
    const products = $products.getState();
    return products.reduce((prev, { cost }) => (prev + cost), 0);
});
