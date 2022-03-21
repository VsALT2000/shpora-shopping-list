export type ShopType = "Пятёрочка" | "Верный" | "Монетка" | "Перекрёсток" | "Магнит";

export type ProductType = {
    name: string,
    id: number,
    date: Date,
    price?: number,
    amount: number,
    shop?: ShopType,
    bought: boolean,
};