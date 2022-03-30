import {$activeFilters, $allProducts, $filteredProducts} from "./ProductsStore";
import {$newProductId} from "./ProductsCountStore";

const SetItems = () => {
    $allProducts.uploadToLocalStore();
    $filteredProducts.uploadToLocalStore();
    $activeFilters.uploadToLocalStore();
    $newProductId.uploadToLocalStore();
}

const GetItems = () => {
    $allProducts.updateFromLocalStore();
    $filteredProducts.updateFromLocalStore();
    $activeFilters.updateFromLocalStore();
    $newProductId.updateFromLocalStore();
}

const SyncWithLocalStorage = () => {
    window.onbeforeunload = () => SetItems();
    window.onblur = () => SetItems();
    window.onstorage = () => GetItems();
}

export default SyncWithLocalStorage;