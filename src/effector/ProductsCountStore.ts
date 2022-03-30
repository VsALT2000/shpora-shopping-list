import {createEvent, sample} from "effector";
import {AddNewProduct} from "./ProductsStore";
import {localStore} from "./LocalStore";

export const $newProductId = localStore<number>(0, "newProductId");

const Increment = createEvent<void>("IncrementProductCount");

$newProductId.store
    .on(Increment, state => state + 1)
    .watch(count => console.log("Products Counter:", count, "\n\n"));

sample({
    clock: AddNewProduct,
    source: $newProductId.store,
    target: Increment,
})
