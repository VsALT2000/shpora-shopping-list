export enum ShopType {
    pyaterochka = "Пятёрочка",
    verno = "Верный",
    perekrestok = "Перекрёсток",
    magnit = "Магнит"
}

export enum UnitType {
    piece = "шт",
    kg = "кг",
    g = "г",
    l = "л",
}

export type ProductType = {
    name: string,
    id: number,
    date: Date,
    price?: number,
    amount: number,
    unit: UnitType,
    shop?: ShopType,
    bought: boolean,
};

export type ProductsListType = {
    name: string,
    id: number,
    archived?: boolean,
    boughtProducts: number[],
    pendingProducts: number[],
};

export type AddProductByListIdType = {
    listId: number,
    product: ProductType,
}

export type ProductInListType = {
    listId: number,
    productId: number,
}

export type EditProductType = {
    id: number,
    payload: Partial<Omit<ProductType, "id" | "date" | "bought">>
}
