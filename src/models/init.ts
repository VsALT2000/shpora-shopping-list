import './allProducts/init';
import './productsList/init';
import {Store, Event} from "effector";
import syncWithLocalStorage from "./SyncWithLocalStorage";
import {$productsStore, AddNewProduct, DeleteProducts, EditProduct} from "./allProducts/ProductsStore";
import {$activeFilters} from "./filteredProducts/FilteredProductStore";
import {$newProductId} from "./allProducts/ProductsCountStore";
import {$newListId} from "./productsList/ProductsListCountStore";
import {$listsStore, AddNewList, ToggleProductBoughtState} from "./productsList/ProductsListStore";
import {$activeSort} from "./sortedProducts/SortedProductStore";

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
    activeSort: (newValue: string | null) => newValue ? syncActiveSort(JSON.parse(newValue)) : syncActiveSort(),
    listsStore: (newValue: string | null) => newValue ? syncListsStore(JSON.parse(newValue)) : syncListsStore(),
    newListId: (newValue: string | null) => newValue ? syncNewListId(JSON.parse(newValue)) : syncNewListId(),
    activeFilters: (newValue: string | null) => newValue ? syncActiveFilters(JSON.parse(newValue)) : syncActiveFilters(),
    productsStore: (newValue: string | null) => newValue ? syncProductsStore(JSON.parse(newValue)) : syncProductsStore(),
    newProductId: (newValue: string | null) => newValue ? syncNewProductId(JSON.parse(newValue)) : syncNewProductId(),
}

window.onstorage = (e) => syncFromLS[e.key as keyof typeof syncFromLS](e.newValue);
