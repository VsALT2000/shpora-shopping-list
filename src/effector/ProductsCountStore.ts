import {createEvent, createStore, sample} from "effector";
import {AddNewProduct} from "./ProductsStore";

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
