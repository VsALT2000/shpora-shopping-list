import {sample} from "effector";
import {
    AddNewList,
    AddProductToList,
    DeleteList,
    DeleteProductFromList,
    ToggleProductBoughtState
} from "./ProductsListStore";
import {$newListId, Increment} from "./ProductsListCountStore";
import {AddNewProduct, BuyingProduct, DeleteProducts} from "../allProducts/ProductsStore";

sample({
    clock: AddNewList,
    source: $newListId,
    target: Increment,
})

sample({
    clock: DeleteList,
    fn: (clockData) => (clockData.productsId),
    target: DeleteProducts,
})

sample({
    clock: AddProductToList,
    fn: (clockData) => (clockData.product),
    target: AddNewProduct,
})

sample({
    clock: DeleteProductFromList,
    fn: (clockData) => ([clockData.productId]),
    target: DeleteProducts,
})

sample({
    clock: ToggleProductBoughtState,
    fn: (clockData) => (clockData.productId),
    target: BuyingProduct,
})
