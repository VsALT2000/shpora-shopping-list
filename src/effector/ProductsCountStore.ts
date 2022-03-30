import {createEvent, createStore, sample} from "effector";
import {AddNewProduct} from "./ProductsStore";
import {persist} from 'effector-storage/local'

export const $NewProductId = createStore<number>(0);
persist({store: $NewProductId, key: "newProductId"});

const Increment = createEvent<void>("IncrementProductCount");

$NewProductId
    .on(Increment, state => state + 1)
    .watch(count => console.log("Products Counter:", count, "\n\n"));

sample({
    clock: AddNewProduct,
    source: $NewProductId,
    target: Increment,
})
