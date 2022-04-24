import './allProducts/init';
import './productsList/init';
import {Store, Event, EventPayload} from "effector";
import syncWithLocalStorage from "./SyncWithLocalStorage";
import {$productsStore, AddNewProduct, DeleteProducts, EditProduct} from "./allProducts/ProductsStore";
import {$activeFilters} from "./filteredProducts/FilteredProductStore";
import {$newProductId} from "./allProducts/ProductsCountStore";
import {$newListId} from "./productsList/ProductsListCountStore";
import {$listsStore, AddNewList, ToggleProductBoughtState} from "./productsList/ProductsListStore";
import {$activeSort} from "./sortedProducts/SortedProductStore";
import {ProductsListType, ProductType, ShopType, SortOrder} from "../types/types";

const watcher = (message: string, target: Store<any> | Event<any>) => {
    if (process.env.NODE_ENV === 'development')
        target.watch(value => console.log(message, value, "\n\n"));
}

watcher("Весь Store:", $productsStore);
watcher("Весь ListsStore:", $listsStore);
watcher("Добавлен продукт:", AddNewProduct);
watcher("Добавлен список:", AddNewList);
watcher("Куплен продукт c id:", ToggleProductBoughtState);
watcher("Удалён продукт c id:", DeleteProducts);
watcher("Изменён продукт:", EditProduct);
watcher("Фильтры:", $activeFilters);
watcher("Сортировка:", $activeSort);
watcher("Products Counter:", $newProductId);
watcher("List Counter:", $newListId);

const syncProductsStore = syncWithLocalStorage($productsStore, "productsStore");
const syncNewListId = syncWithLocalStorage($newListId, "newListId");
const syncNewProductId = syncWithLocalStorage($newProductId, "newProductId");
const syncListsStore = syncWithLocalStorage($listsStore, "listsStore");
const syncActiveSort = syncWithLocalStorage($activeSort, "activeSort");
const syncActiveFilters = syncWithLocalStorage($activeFilters, "activeFilters");

const syncFromLS = {
    activeSort: (newValue: SortOrder | null) => syncActiveSort(newValue),
    listsStore: (newValue: ProductsListType[] | null) => syncListsStore(newValue),
    newListId: (newValue: number | null) => syncNewListId(newValue),
    activeFilters: (newValue: ShopType[] | null) => syncActiveFilters(newValue),
    productsStore: (newValue: ProductType[] | null) => syncProductsStore(newValue),
    newProductId: (newValue: number | null) => syncNewProductId(newValue),
}

window.onstorage = (e) => {
    const newValue = e.newValue ? JSON.parse(e.newValue) : null;
    const handler = syncFromLS[e.key as keyof typeof syncFromLS];
    if (handler) handler(newValue);
};
