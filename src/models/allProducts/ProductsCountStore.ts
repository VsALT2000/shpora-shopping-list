import {createEvent, createStore} from "effector";

const defaultState = JSON.parse(window.localStorage.getItem("newProductId") || "0");
export const $NewProductId = createStore<number>(defaultState);
export const Increment = createEvent<void>("IncrementProductCount");

$NewProductId
    .on(Increment, state => state + 1);
