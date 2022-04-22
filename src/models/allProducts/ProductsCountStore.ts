import {createEvent, createStore} from "effector";

export const $newProductId = createStore<number>(0);
export const Increment = createEvent<void>("IncrementProductCount");

$newProductId
    .on(Increment, state => state + 1)
