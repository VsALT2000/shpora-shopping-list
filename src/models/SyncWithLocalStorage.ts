import {createEvent, sample, Store} from "effector";

const syncWithLocalStorage = <T>(store: Store<T>, name: string) => {
    const writeToLS = createEvent<void>();
    const syncWithLS = createEvent<T | void | null>();
    store
        .on(writeToLS, store => {
            try {
                window.localStorage.setItem(name, JSON.stringify(store));
            } catch (e) {
                console.error(e);
            }
        })
        .on(syncWithLS, (state, newValue) => {
            let store = null;
            if (!newValue)
                store = localStorage.getItem(name);
            return newValue || (store ? JSON.parse(store) : state);
        })

    sample({
        clock: store,
        target: writeToLS,
    })

    syncWithLS();
    return syncWithLS;
}

export default syncWithLocalStorage;
