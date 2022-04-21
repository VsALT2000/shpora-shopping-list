import {createEvent, createStore} from "effector";

const defaultState = JSON.parse(window.localStorage.getItem("newListId") || "0");
export const $NewListId = createStore<number>(defaultState);
export const Increment = createEvent<void>("IncrementListCount");

$NewListId
    .on(Increment, state => state + 1);
