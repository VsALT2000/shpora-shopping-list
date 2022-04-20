import {ProductType, SortOrder} from "../types/types";

export const sortingFunctions = {
    [SortOrder.firstCheap]: (productA: ProductType, productB: ProductType) => {
        // @ts-ignore TODO: Сергей Кашкин: Пока сломано, жду реализацию с полем sum у продуктов
        return productA.amount * productA.price - productB.amount * productB.price;
    },
    [SortOrder.firstExpensive]: (productA: ProductType, productB: ProductType) => {
        // @ts-ignore TODO: Сергей Кашкин: Пока сломано, жду реализацию с полем sum у продуктов
        return productB.amount * productB.price - productA.amount * productA.price;
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