import {sample} from "effector";
import {$listsStore, AddNewList, AddProductToList, DeleteList, DeleteProductFromList} from "./ProductsListStore";
import {$NewListId, Increment} from "./ProductsListCountStore";
import {AddNewProduct, DeleteProducts} from "../allProducts/ProductsStore";
import {ProductsListType} from "../../types/types";

const getList = (sourceData: ProductsListType[], clockData: number) => {
    const pendingProducts = sourceData.find(list => list.id === clockData)?.pendingProducts || [];
    const boughtProducts = sourceData.find(list => list.id === clockData)?.boughtProducts || [];
    console.log(sourceData)
    console.log(pendingProducts)
    console.log(boughtProducts)
    return [...pendingProducts, ...boughtProducts];
}

sample({
    clock: AddNewList,
    source: $NewListId,
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
