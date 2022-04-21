import {createEvent, createStore} from "effector";
import {SortOrder} from "../../types/types";

export const ChangeSort = createEvent<SortOrder>("ChangeFilter");

const defaultState = JSON.parse(window.localStorage.getItem("activeSort") || `${SortOrder.firstNew}`);
export const $activeSort = createStore<SortOrder>(defaultState);

$activeSort
    .on(ChangeSort, (state, newFilters) => newFilters);
