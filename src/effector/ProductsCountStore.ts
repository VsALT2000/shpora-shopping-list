import {createEvent, createStore, sample} from "effector";
import {AddNewProduct} from "./ProductsStore";

export const NewProductId = createStore<number>(0);
const Increment = createEvent<void>("IncrementProductCount");

NewProductId
    .on(Increment, state => state + 1)
    .watch(count => console.log("Products Counter: " + count));

sample({
    clock: AddNewProduct,
    source: NewProductId,
    target: Increment,
})
