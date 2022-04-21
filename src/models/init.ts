import './allProducts/init';
import './productsList/init';
import {Store, Event, createEvent} from "effector";
import {$store, AddNewProduct, DeleteProducts, EditProduct} from "./allProducts/ProductsStore";
import {$activeFilters} from "./filteredProducts/FilteredProductStore";
import {$NewProductId} from "./allProducts/ProductsCountStore";
import {$NewListId} from "./productsList/ProductsListCountStore";
import {$listsStore, AddNewList, ToggleProductBoughtState} from "./productsList/ProductsListStore";
import {$activeSort} from "./sortedProducts/SortedProductStore";
import {SortOrder} from "../types/types";

const watcher = (message: string, target:Store<any> | Event<any>) => {
    if (process.env.NODE_ENV === 'development')
        target.watch(value => console.log(message, value, "\n\n"));
}

const SetItems = () => {
    if (JSON.stringify($store.getState()) !== window.localStorage.getItem("store"))
        window.localStorage.setItem("store", JSON.stringify($store.getState()));
    if (JSON.stringify($listsStore.getState()) !== window.localStorage.getItem("listsStore"))
        window.localStorage.setItem("listsStore", JSON.stringify($listsStore.getState()));
    if (JSON.stringify($activeFilters.getState()) !== window.localStorage.getItem("activeFilters"))
        window.localStorage.setItem("activeFilters", JSON.stringify($activeFilters.getState()));
    if (JSON.stringify($activeSort.getState()) !== window.localStorage.getItem("activeSort"))
        window.localStorage.setItem("activeSort", JSON.stringify($activeSort.getState()));
    if (JSON.stringify($NewProductId.getState()) !== window.localStorage.getItem("newProductId"))
        window.localStorage.setItem("newProductId", JSON.stringify($NewProductId.getState()));
    if (JSON.stringify($NewListId.getState()) !== window.localStorage.getItem("newListId"))
        window.localStorage.setItem("newListId", JSON.stringify($NewListId.getState()));
}

const updateFromLocalStore = (store: Store<any>, defaultState: string, key: string) => {
    const update = createEvent<string | null>();
    store.on(update, (_, localItem) => JSON.parse(localItem || defaultState));
    try {
        update(window.localStorage.getItem(key));
    } catch (e) {
        console.error(e);
    }
}

const GetItems = () => {
    updateFromLocalStore($store, "[]", "store");
    updateFromLocalStore($listsStore, "[]", "listsStore");
    updateFromLocalStore($activeFilters, "[]", "activeFilters");
    updateFromLocalStore($activeSort, `${SortOrder.firstNew}`, "activeSort");
    updateFromLocalStore($NewProductId, "0", "newProductId");
    updateFromLocalStore($NewListId, "0", "newListId");
}

watcher("Весь Store:", $store);
watcher("Весь ListsStore:", $listsStore);
watcher("Добавлен продукт:", AddNewProduct);
watcher("Добавлен список:", AddNewList);
watcher("Куплен продукт c id:", ToggleProductBoughtState);
watcher("Удалён продукт c id:", DeleteProducts);
watcher("Изменён продукт:", EditProduct);
watcher("Фильтры:", $activeFilters);
watcher("Сортировка:", $activeSort);
watcher("Products Counter:", $NewProductId);
watcher("List Counter:", $NewListId);

window.onbeforeunload = () => SetItems();
window.onblur = () => SetItems();
window.onstorage = () => GetItems();
