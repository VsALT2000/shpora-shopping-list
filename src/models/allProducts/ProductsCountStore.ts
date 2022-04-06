import {createEvent, createStore} from "effector";

export const $NewProductId = createStore<number>(0);
export const Increment = createEvent<void>("IncrementProductCount");

$NewProductId
    .on(Increment, state => state + 1);
