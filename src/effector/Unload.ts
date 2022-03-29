import {$activeFilters, $products, $store} from "./ProductsStore";
import {$NewProductId} from "./ProductsCountStore";

window.onbeforeunload = () => {
    window.localStorage.setItem("store", JSON.stringify($store.getState()));
    window.localStorage.setItem("products", JSON.stringify($products.getState()));
    window.localStorage.setItem("filters", JSON.stringify($activeFilters.getState()));
    window.localStorage.setItem("newProductId", JSON.stringify($NewProductId.getState()));
}
