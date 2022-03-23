import {createEvent, createStore, sample} from "effector";
import {EditProductType, ProductType, ShopType} from "../types/types";

export const AddNewProduct = createEvent<ProductType>("AddNewProduct");
AddNewProduct.watch(product => console.log(product));

export const BuyingProduct = createEvent<number>("BuyingProduct");
BuyingProduct.watch(product => console.log(product));

export const DeleteProduct = createEvent<number>("DeleteProduct");
DeleteProduct.watch(product => console.log(product));

export const EditProduct = createEvent<EditProductType>("EditProduct");
EditProduct.watch(product => console.log(product));

const Store = createStore<ProductType[]>([]);

Store
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
    .watch(products => {
        console.log("Весь Store: ");
        console.log(products);
        console.log("");
    });

export const ChangeFilter = createEvent<ShopType[]>("ChangeFilter");
const ApplyFilters = createEvent<{state: ProductType[], filters: ShopType[]}>("ApplyFilters");

export const Products = createStore<ProductType[]>(Store.defaultState);
const ActiveFilters = createStore<ShopType[]>([]);

ActiveFilters
    .on(ChangeFilter, (state, newFilters) => newFilters)
    .watch(filters => {
        console.log("Фильтры: ");
        console.log(filters);
        console.log("");
    });

const CheckAllFilter = (product:ProductType, filters:ShopType[]) => {
    if (filters.length !== 0) {
        if (!!product.shop) {
            for (const filter of filters)
                if (product.shop === filter)
                    return true;
        }
        return false;
    } else return true;
}

Products
    .on(ApplyFilters, (state, newState) => {
        return newState.state.filter(product => CheckAllFilter(product, newState.filters))
    })
    .watch(products => {
        console.log("Отфильтрованный Store: ");
        console.log(products);
        console.log("");
    });

sample({
    clock: Store,
    source: ActiveFilters,
    fn: (sourceData, clockData) => ({filters: sourceData, state: clockData}),
    target: ApplyFilters,
})

sample({
    clock: ActiveFilters,
    source: Store,
    fn: (sourceData, clockData) => ({filters: clockData, state: sourceData}),
    target: ApplyFilters,
})
