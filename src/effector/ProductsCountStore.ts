import {createEvent, createStore, sample} from "effector";
import {AddNewProduct} from "./ProductsStore";

const defaultNewProductId:number = window.localStorage.getItem("newProductId") === null
    ? 0 // @ts-ignore
    : Number(JSON.parse(window.localStorage.getItem("newProductId")));
export const $NewProductId = createStore<number>(defaultNewProductId);
const Increment = createEvent<void>("IncrementProductCount");

$NewProductId
    .on(Increment, state => {
        const newState = state + 1;
        window.localStorage.setItem("newProductId", JSON.stringify(newState));
        return newState;
    })
    .watch(count => console.log("Products Counter:", count, "\n\n"));

sample({
    clock: AddNewProduct,
    source: $NewProductId,
    target: Increment,
})
