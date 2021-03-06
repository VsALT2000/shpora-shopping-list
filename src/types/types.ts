export enum SortOrder {
    firstNew = "Сначала новые",
    firstOld = "Сначала старые",
    firstCheap = "Сначала дешёвые",
    firstExpensive = "Сначала дорогие",
    alphabetically = "По наименованию",
}

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
    cost: number;
    amount: number,
    unit: UnitType,
    shop?: ShopType,
    bought: boolean,
};

export type ProductsListType = {
    name: string,
    id: number,
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
