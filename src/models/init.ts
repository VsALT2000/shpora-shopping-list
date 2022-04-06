import './allProducts/init';
import './filteredProducts/init';
import {Store, Event, createEvent} from "effector";
import {$allProducts, AddNewProduct, BuyingProduct, DeleteProduct, EditProduct} from "./allProducts/ProductsStore";
import {$activeFilters, $filteredProducts} from "./filteredProducts/FilteredProductStore";
import {$newProductId} from "./allProducts/ProductsCountStore";

const watcher = (message: string, target:Store<any> | Event<any>) => {
    if (process.env.NODE_ENV === 'development')
        target.watch(value => console.log(message, value, "\n\n"));
}

const SetItems = () => {
    if (JSON.stringify($allProducts.getState()) !== window.localStorage.getItem("allProducts"))
        window.localStorage.setItem("allProducts", JSON.stringify($allProducts.getState()));
    if (JSON.stringify($activeFilters.getState()) !== window.localStorage.getItem("activeFilters"))
        window.localStorage.setItem("activeFilters", JSON.stringify($activeFilters.getState()));
    if (JSON.stringify($newProductId.getState()) !== window.localStorage.getItem("newProductId"))
        window.localStorage.setItem("newProductId", JSON.stringify($newProductId.getState()));
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
    updateFromLocalStore($allProducts, "[]", "allProducts");
    updateFromLocalStore($activeFilters, "[]", "activeFilters");
    updateFromLocalStore($newProductId, "0", "newProductId");
}

watcher("Весь Store:", $allProducts);
watcher("Добавлен продукт:", AddNewProduct);
watcher("Куплен продукт c id:", BuyingProduct);
watcher("Удалён продукт c id:", DeleteProduct);
watcher("Изменён продукт:", EditProduct);
watcher("Фильтры:", $activeFilters);
watcher("Отфильтрованный Store:", $filteredProducts);
watcher("Products Counter:", $newProductId);

window.onbeforeunload = () => SetItems();
window.onblur = () => SetItems();
window.onstorage = () => GetItems();
