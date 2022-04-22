import {createEvent, createStore, sample} from "effector";
import {ShopType} from "../../types/types";

export const ChangeFilter = createEvent<ShopType[]>("ChangeFilter");
export const ReadFiltersFromLS = createEvent<void>("ReadFilters");
const WriteToLS = createEvent<void>("WriteFilters");
export const $activeFilters = createStore<ShopType[]>([]);

$activeFilters
    .on(ChangeFilter, (state, newFilters) => newFilters)
    .on(ReadFiltersFromLS, (_) => {
            const stored = window.localStorage.getItem("activeFilters");
            return stored ? JSON.parse(stored) : [];
        }
    )
    .on(WriteToLS, (store) => {
            window.localStorage.setItem("activeFilters", JSON.stringify(store));
        }
    );

ReadFiltersFromLS();

sample({
    clock: $activeFilters,
    target: WriteToLS,
})
