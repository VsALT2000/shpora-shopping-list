import {sample} from "effector";
import {AddNewProduct} from "./ProductsStore";
import {$NewProductId, Increment} from "./ProductsCountStore";

sample({
    clock: AddNewProduct,
    source: $NewProductId,
    target: Increment,
})
