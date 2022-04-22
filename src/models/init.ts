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

const syncNewListId = syncWithLocalStorage($newListId, "newListId");
const syncListsStore = syncWithLocalStorage($listsStore, "listsStore");
const syncActiveSort = syncWithLocalStorage($activeSort, "activeSort");
const syncActiveFilters = syncWithLocalStorage($activeFilters, "activeFilters");
const syncProductsStore = syncWithLocalStorage($productsStore, "productsStore");
const syncNewProductId = syncWithLocalStorage($newProductId, "newProductId");

const syncFromLS = {
    activeSort: (newValue: SortOrder | null) => newValue ? syncActiveSort(newValue) : syncActiveSort(),
    listsStore: (newValue: ProductsListType[] | null) => newValue ? syncListsStore(newValue) : syncListsStore(),
    newListId: (newValue: number | null) => newValue ? syncNewListId(newValue) : syncNewListId(),
    activeFilters: (newValue: ShopType[] | null) => newValue ? syncActiveFilters(newValue) : syncActiveFilters(),
    productsStore: (newValue: ProductType[] | null) => newValue ? syncProductsStore(newValue) : syncProductsStore(),
    newProductId: (newValue: number | null) => newValue ? syncNewProductId(newValue) : syncNewProductId(),
}

window.onstorage = (e) => {
    const newValue = e.newValue ? JSON.parse(e.newValue) : null;
    const handler = syncFromLS[e.key as keyof typeof syncFromLS];
    if (handler) handler(newValue);
};
