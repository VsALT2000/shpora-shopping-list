import './allProducts/init';
import './productsList/init';
import {Store, Event} from "effector";
import {$productsStore, AddNewProduct, DeleteProducts, EditProduct, ReadStoreFromLS} from "./allProducts/ProductsStore";
import {$activeFilters, ReadFiltersFromLS} from "./filteredProducts/FilteredProductStore";
import {$newProductId, ReadNewProductIdFromLS} from "./allProducts/ProductsCountStore";
import {$newListId, ReadNewListIdFromLS} from "./productsList/ProductsListCountStore";
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

const ReadFromLS = {
    activeSort: ReadSortFromLS,
    listsStore: ReadListsStoreFromLS,
    newListId: ReadNewListIdFromLS,
    activeFilters: ReadFiltersFromLS,
    productsStore: ReadStoreFromLS,
    newProductId: ReadNewProductIdFromLS,
}

window.onstorage = (e) => {
    try {
        ReadFromLS[e.key as keyof typeof ReadFromLS]();
    } catch (e) {
        console.error(e);
    }
};
