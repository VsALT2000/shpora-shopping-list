import {Store} from "effector";

export enum ShopType {
    pyaterochka = "Пятёрочка",
    verno = "Верный",
    perekrestok = "Перекрёсток",
    magnit = "Магнит"
}

export type ProductType = {
    name: string,
    id: number,
    date: Date,
    price?: number,
    amount: number,
    shop?: ShopType,
    bought: boolean,
};

export type EditProductType = {
    id: number,
    payload: Partial<Omit<ProductType, "id" | "date" | "bought">>
}
