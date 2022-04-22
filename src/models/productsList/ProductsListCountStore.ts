import {createEvent, createStore, sample} from "effector";

export const $NewListId = createStore<number>(0);
export const ReadNewListIdFromLS = createEvent<void>("ReadNewListId");
const WriteToLS = createEvent<void>("WriteNewListId");
export const Increment = createEvent<void>("IncrementListCount");

$NewListId
    .on(Increment, state => state + 1)
    .on(ReadNewListIdFromLS, (_) => {
            const stored = window.localStorage.getItem("newListId");
            return stored ? JSON.parse(stored) : 0;
        }
    )
    .on(WriteToLS, (store) => {
            window.localStorage.setItem("newListId", JSON.stringify(store));
        }
    );

ReadNewListIdFromLS();

sample({
    clock: $NewListId,
    target: WriteToLS,
})
