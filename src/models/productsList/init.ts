import {sample} from "effector";
import {AddNewList, AddProductToList, DeleteProductFromList} from "./ProductsListStore";
import {$NewListId, Increment} from "./ProductsListCountStore";
import {AddNewProduct, DeleteProduct} from "../allProducts/ProductsStore";

sample({
    clock: AddNewList,
    source: $NewListId,
    target: Increment,
})

sample({
    clock: AddProductToList,
    fn: (clockData) => (clockData.product),
    target: AddNewProduct,
})

sample({
    clock: DeleteProductFromList,
    fn: (clockData) => (clockData.productId),
    target: DeleteProduct,
})
