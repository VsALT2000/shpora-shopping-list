import {sample} from "effector";
import {$store, AddNewProduct} from "./ProductsStore";
import {$NewProductId, Increment} from "./ProductsCountStore";
import {$TotalSumStore, GetTotalSum} from "./TotalSumStore"
import { $products } from "../filteredProducts/FilteredProductStore";



sample({
    clock: AddNewProduct,
    source: $NewProductId,
    target: Increment,
})

sample({
    clock: $products,
    source: $TotalSumStore,
    target: GetTotalSum,
})