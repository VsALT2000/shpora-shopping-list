import {sample} from "effector";
import {$store, AddNewProduct} from "./ProductsStore";
import {$NewProductId, Increment} from "./ProductsCountStore";
import {$TotalSumStore, GetTotalSum} from "./TotalSumStore"



sample({
    clock: AddNewProduct,
    source: $NewProductId,
    target: Increment,
})

sample({
    clock: $store,
    source: $TotalSumStore,
    target: GetTotalSum,
})