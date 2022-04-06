import {createEvent, createStore} from "effector";

const defaultState = JSON.parse(window.localStorage.getItem("newProductId") || "0");
export const $newProductId = createStore<number>(defaultState);
export const Increment = createEvent<void>("IncrementProductCount");

$newProductId
    .on(Increment, state => state + 1);
