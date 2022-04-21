import {ProductType, SortOrder} from "../types/types";

export const sortingFunctions = {
    [SortOrder.firstCheap]: (productA: ProductType, productB: ProductType) => {
        return productA.cost - productB.cost;
    },
    [SortOrder.firstExpensive]: (productA: ProductType, productB: ProductType) => {
        return productB.cost - productA.cost;
    },
    [SortOrder.alphabetically]: (productA: ProductType, productB: ProductType) => {
        return productA.name.localeCompare(productB.name, 'ru', {sensitivity: "base", numeric: true});
    },
    [SortOrder.firstNew]: (productA: ProductType, productB: ProductType) => {
        return new Date(productB.date).getTime() - new Date(productA.date).getTime();
    },
    [SortOrder.firstOld]: (productA: ProductType, productB: ProductType) => {
        return new Date(productA.date).getTime() - new Date(productB.date).getTime();
    }
}