import {createEvent, createStore, sample} from "effector";
import {EditProductType, ProductType, ShopType} from "../types/types";

// TODO: Сергей Кашкин: Обернуть все watch'еры в process.env.NODE_ENV === 'development'

export const AddNewProduct = createEvent<ProductType>("AddNewProduct");
AddNewProduct.watch(product => console.log('Добавлен продукт:', product, "\n\n"));

export const BuyingProduct = createEvent<number>("BuyingProduct");
BuyingProduct.watch(productId => console.log('Куплен продукт c id:', productId, "\n\n"));

export const DeleteProduct = createEvent<number>("DeleteProduct");
DeleteProduct.watch(productId => console.log('Удалён продукт c id:', productId, "\n\n"));

export const EditProduct = createEvent<EditProductType>("EditProduct");
EditProduct.watch(product => console.log('Добавлен продукт:', product, "\n\n"));

const defaultState = JSON.parse(window.localStorage.getItem("store") || "[]");
export const $store = createStore<ProductType[]>(defaultState);

$store
    .on(AddNewProduct, (state, product: ProductType) => [...state, product])
    .on(BuyingProduct, (state, productId: number) => {
        const newState = state.slice();
        const product = newState.find(product => product.id === productId)
        if (!!product)
            product.bought = !product.bought;
        return newState;
    })
    .on(DeleteProduct, (state, productId: number) => {
        return state.filter(product => product.id !== productId);
    })
    .on(EditProduct, (state, newProduct: EditProductType) => {
        const newState = state.slice();
        const productIndex = newState.findIndex(product => product.id === newProduct.id)
        if (productIndex !== -1) {
            const payload = newProduct.payload
            const fields = Object.keys(payload);
            for (const field of fields) {
                // @ts-ignore Сделал так для расширяемости
                newState[productIndex][field] = payload[field];
            }
        }
        return newState;
    })
    .watch(products => console.log("Весь Store:", products, "\n\n"));

export const ChangeFilter = createEvent<ShopType[]>("ChangeFilter");
const ApplyFilters = createEvent<{state: ProductType[], filters: ShopType[]}>("ApplyFilters");

const defaultProducts = JSON.parse(window.localStorage.getItem("products") || "[]");
export const $products = createStore<ProductType[]>(defaultProducts);

const defaultFilters:ShopType[] = JSON.parse(window.localStorage.getItem("filters") || "[]");
export const $activeFilters = createStore<ShopType[]>(defaultFilters);

$activeFilters
    .on(ChangeFilter, (state, newFilters) => newFilters)
    .watch(filters => console.log('Фильтры:', filters, '\n\n'));

const CheckAllFilter = (product:ProductType, filters:ShopType[]) => !!product.shop && filters.includes(product.shop);

$products
    .on(ApplyFilters, (_, newState) => {
        return newState.filters.length
            ? newState.state.filter(product => CheckAllFilter(product, newState.filters))
            : newState.state;
    })
    .watch(products => console.log("Отфильтрованный Store:", products, '\n\n'));

sample({
    clock: $store,
    source: $activeFilters,
    fn: (sourceData, clockData) => ({filters: sourceData, state: clockData}),
    target: ApplyFilters,
})

sample({
    clock: $activeFilters,
    source: $store,
    fn: (sourceData, clockData) => ({filters: clockData, state: sourceData}),
    target: ApplyFilters,
})
