import { createEvent, createStore } from "effector";
import { $store } from "../allProducts/ProductsStore";

export const $TotalSumStore = createStore<number>(0);
export const GetTotalSum = createEvent<void>("GetTotalSum");

$TotalSumStore
    .on(GetTotalSum, () => {
    const products = $store.getState();
    return products.reduce((sum, { price, amount }) => (price ? sum + price * amount : sum), 0);
});
