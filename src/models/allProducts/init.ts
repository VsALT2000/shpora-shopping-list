import {sample} from "effector";
import {AddNewProduct} from "./ProductsStore";
import {$newProductId, Increment} from "./ProductsCountStore";

sample({
    clock: AddNewProduct,
    source: $newProductId,
    target: Increment,
})
