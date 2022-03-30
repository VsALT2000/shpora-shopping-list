import {createEvent, createStore, sample} from "effector";
import {AddNewProduct} from "./ProductsStore";
import {persist} from 'effector-storage/local'

export const $newProductId = createStore<number>(0);
persist({store: $newProductId, key: "newProductId"});

const Increment = createEvent<void>("IncrementProductCount");

$newProductId
    .on(Increment, state => state + 1)
    .watch(count => console.log("Products Counter:", count, "\n\n"));

sample({
    clock: AddNewProduct,
    source: $newProductId,
    target: Increment,
})
