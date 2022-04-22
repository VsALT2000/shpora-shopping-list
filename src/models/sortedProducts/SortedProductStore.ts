import {createEvent, createStore} from "effector";
import {SortOrder} from "../../types/types";

export const ChangeSort = createEvent<SortOrder>("ChangeFilter");

export const $activeSort = createStore<SortOrder>(SortOrder.firstNew);

$activeSort
    .on(ChangeSort, (state, newFilters) => newFilters)
