import {sample} from "effector";
import {AddNewList} from "./ProductsListStore";
import {$NewListId, Increment} from "./ProductsListCountStore";

sample({
    clock: AddNewList,
    source: $NewListId,
    target: Increment,
})

