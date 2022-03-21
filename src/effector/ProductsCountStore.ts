import {createEvent, createStore, sample} from "effector";
import {AddNewProduct} from "./ProductsStore";

export const ProductsCounter = createStore<number>(2);
export const Increment = createEvent<void>("IncrementProductCount");

ProductsCounter
    .on(Increment, state => state + 1)
    .watch(count => console.log("Products Counter: " + count));

sample({
    clock: AddNewProduct,
    source: ProductsCounter,
    target: Increment,
})