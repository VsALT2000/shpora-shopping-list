import {ProductType, SortByType} from "../types/types";

export const sortingFunctions = {
    [SortByType.firstCheap]: (productA: ProductType, productB: ProductType) => {
        // @ts-ignore TODO: Сергей Кашкин: Пока сломано, жду реализацию с полем sum у продуктов
        return productA.amount * productA.price - productB.amount * productB.price;
    },
    [SortByType.firstExpensive]: (productA: ProductType, productB: ProductType) => {
        // @ts-ignore TODO: Сергей Кашкин: Пока сломано, жду реализацию с полем sum у продуктов
        return productB.amount * productB.price - productA.amount * productA.price;
    },
    [SortByType.alphabetically]: (productA: ProductType, productB: ProductType) => {
        return productA.name.localeCompare(productB.name, 'ru', {sensitivity: "base", numeric: true});
    },
    [SortByType.firstNew]: (productA: ProductType, productB: ProductType) => {
        return new Date(productB.date).getTime() - new Date(productA.date).getTime();
    },
    [SortByType.firstOld]: (productA: ProductType, productB: ProductType) => {
        return new Date(productA.date).getTime() - new Date(productB.date).getTime();
    }
}