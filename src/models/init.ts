import './allProducts/init';
import './productsList/init';
import {Store, Event} from "effector";
import {$store, AddNewProduct, DeleteProducts, EditProduct, ReadStoreFromLS} from "./allProducts/ProductsStore";
import {$activeFilters, ReadFiltersFromLS} from "./filteredProducts/FilteredProductStore";
import {$NewProductId, ReadNewProductIdFromLS} from "./allProducts/ProductsCountStore";
import {$NewListId, ReadNewListIdFromLS} from "./productsList/ProductsListCountStore";
import {
    $listsStore,
    AddNewList,
    ReadListsStoreFromLS,
    ToggleProductBoughtState
} from "./productsList/ProductsListStore";
import {$activeSort, ReadSortFromLS} from "./sortedProducts/SortedProductStore";

const watcher = (message: string, target: Store<any> | Event<any>) => {
    if (process.env.NODE_ENV === 'development')
        target.watch(value => console.log(message, value, "\n\n"));
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

const ReadFromLS = {
    activeSort: ReadSortFromLS,
    listsStore: ReadListsStoreFromLS,
    newListId: ReadNewListIdFromLS,
    activeFilters: ReadFiltersFromLS,
    store: ReadStoreFromLS,
    newProductId: ReadNewProductIdFromLS,
}

window.onstorage = (e) => {
    try {
        ReadFromLS[e.key as keyof typeof ReadFromLS]();
    } catch (e) {
        console.error(e);
    }
};
