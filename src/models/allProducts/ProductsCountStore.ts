import {createEvent, createStore, sample} from "effector";

export const $newProductId = createStore<number>(0);
export const ReadNewProductIdFromLS = createEvent<void>("ReadNewProductId");
const WriteToLS = createEvent<void>("WriteNewProductId");
export const Increment = createEvent<void>("IncrementProductCount");

$newProductId
    .on(Increment, state => state + 1)
    .on(ReadNewProductIdFromLS, (_) => {
        const stored = window.localStorage.getItem("newProductId");
        return stored ? JSON.parse(stored) : 0;
    })
    .on(WriteToLS, (store) => {
        window.localStorage.setItem("newProductId", JSON.stringify(store));
    });

ReadNewProductIdFromLS();

sample({
    clock: $newProductId,
    target: WriteToLS,
});
