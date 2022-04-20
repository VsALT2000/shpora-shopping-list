import {createEvent, createStore} from "effector";

export const $NewListId = createStore<number>(0);
export const Increment = createEvent<void>("IncrementListCount");

$NewListId
    .on(Increment, state => state + 1);