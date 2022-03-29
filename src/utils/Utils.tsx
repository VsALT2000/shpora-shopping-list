import { ProductType } from "../types/types";


export const isValidAmount = (amount: string) => {
    if (amount.match(/^[0-9]+$/) !== null && Number(amount) > 0){
        return true
    }else{
        return false;
    }
}

export const sortingFunctions ={
    'Сначала недорогие': (productA: ProductType, productB: ProductType) => {
        if (productA.price && productB.price) {
            return productA.amount * productA.price - productB.amount * productB.price;
        }
        if (productA.price) {
            return 1;
        }
        if (productB.price) {
            return -1;
        }
        return 0;
    },
    'Сначала дорогие': (productA: ProductType, productB: ProductType) => {
        if (productA.price && productB.price) {
            return productB.amount * productB.price - productA.amount * productA.price;
        }
        if (productA.price) {
            return -1;
        }
        if (productB.price) {
            return 1;
        }
        return 0;
    },

    'По алфавиту': (productA: ProductType, productB: ProductType) => {
        let nameA = productA.name.toLowerCase(),
            nameB = productB.name.toLowerCase();
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    },
    'Сначала новые': (productA: ProductType, productB: ProductType) => {
        return productB.date.getTime() - productA.date.getTime();
    },
    'Сначала старые':(productA: ProductType, productB: ProductType) => {
        return productA.date.getTime() - productB.date.getTime();
    }

}