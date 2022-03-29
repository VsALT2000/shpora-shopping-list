import {createEvent, createStore, sample} from "effector";
import {$activeFilters, $products, $store, AddNewProduct} from "./ProductsStore";

const defaultNewProductId:number = Number(JSON.parse(window.localStorage.getItem("newProductId") || "0")) ;
export const $NewProductId = createStore<number>(defaultNewProductId);
const Increment = createEvent<void>("IncrementProductCount");

$NewProductId
    .on(Increment, state => state + 1)
    .watch(count => console.log("Products Counter:", count, "\n\n"));

sample({
    clock: AddNewProduct,
    source: $NewProductId,
    target: Increment,
})

window.onbeforeunload = () => {
    window.localStorage.setItem("store", JSON.stringify($store.getState()));
    window.localStorage.setItem("products", JSON.stringify($products.getState()));
    window.localStorage.setItem("filters", JSON.stringify($activeFilters.getState()));
    window.localStorage.setItem("newProductId", JSON.stringify($NewProductId.getState()));
}
