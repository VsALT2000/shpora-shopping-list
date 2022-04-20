import './allProducts/init';
import './productsList/init';
import {Store, Event} from "effector";
import {$store, AddNewProduct, DeleteProduct, EditProduct} from "./allProducts/ProductsStore";
import {$activeFilters} from "./filteredProducts/FilteredProductStore";
import {$NewProductId} from "./allProducts/ProductsCountStore";
import {$NewListId} from "./productsList/ProductsListCountStore";
import {$listsStore, AddNewList, ToggleProductBoughtState} from "./productsList/ProductsListStore";
import {$activeSort} from "./sortedProducts/SortedProductStore";

const watcher = (message: string, target:Store<any> | Event<any>) => {
    if (process.env.NODE_ENV === 'development')
        target.watch(value => console.log(message, value, "\n\n"));
}

watcher("Весь Store:", $store);
watcher("Весь ListsStore:", $listsStore);
watcher("Добавлен продукт:", AddNewProduct);
watcher("Добавлен список:", AddNewList);
watcher("Куплен продукт c id:", ToggleProductBoughtState);
watcher("Удалён продукт c id:", DeleteProduct);
watcher("Изменён продукт:", EditProduct);
watcher("Фильтры:", $activeFilters);
watcher("Сортировка:", $activeSort);
watcher("Products Counter:", $NewProductId);
watcher("List Counter:", $NewListId);
