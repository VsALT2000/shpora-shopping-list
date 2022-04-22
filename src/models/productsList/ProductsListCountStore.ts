import {createEvent, createStore} from "effector";

export const $newListId = createStore<number>(0);
export const Increment = createEvent<void>("IncrementListCount");

$newListId
    .on(Increment, state => state + 1)
