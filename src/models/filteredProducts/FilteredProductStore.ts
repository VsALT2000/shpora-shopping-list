import {createEvent, createStore} from "effector";
import {ShopType} from "../../types/types";

export const ChangeFilter = createEvent<ShopType[]>("ChangeFilter");
export const $activeFilters = createStore<ShopType[]>([]);

$activeFilters
    .on(ChangeFilter, (state, newFilters) => newFilters)
