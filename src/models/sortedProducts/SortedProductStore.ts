import {createEvent, createStore, sample} from "effector";
import {SortOrder} from "../../types/types";

export const ChangeSort = createEvent<SortOrder>("ChangeFilter");

export const $activeSort = createStore<SortOrder>(SortOrder.firstNew);
export const ReadSortFromLS = createEvent<void>("ReadSort");
const WriteToLS = createEvent<void>("WriteSort");

$activeSort
    .on(ChangeSort, (state, newFilters) => newFilters)
    .on(ReadSortFromLS, (_) => {
        const stored = window.localStorage.getItem("activeSort");
        return stored ? JSON.parse(stored) : SortOrder.firstNew;
    })
    .on(WriteToLS, (store) => {
        window.localStorage.setItem("activeSort", JSON.stringify(store));
    });

ReadSortFromLS();

sample({
    clock: $activeSort,
    target: WriteToLS,
});
