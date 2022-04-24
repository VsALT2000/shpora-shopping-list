import {
    $listsStore,
    AddNewList,
    AddProductToList,
    DeleteList,
    DeleteProductFromList
} from "./models/productsList/ProductsListStore";
import {ShopType, UnitType} from "./types/types";
import assert from "assert";
import {$newListId} from "./models/productsList/ProductsListCountStore";
import {createEvent} from "effector";
import './models/init'
import {$productsStore, EditProduct} from "./models/allProducts/ProductsStore";
import {$newProductId} from "./models/allProducts/ProductsCountStore";
import {$activeFilters} from "./models/filteredProducts/FilteredProductStore";
import {$activeSort} from "./models/sortedProducts/SortedProductStore";

const resetListsStore = createEvent();
$listsStore.reset(resetListsStore);

const resetNewListId = createEvent();
$newListId.reset(resetNewListId);

const resetProductsStore = createEvent();
$productsStore.reset(resetProductsStore);

const resetNewProductId = createEvent();
$newProductId.reset(resetNewProductId);

const resetFilters = createEvent();
$activeFilters.reset(resetFilters);

const resetSort = createEvent();
$activeSort.reset(resetSort);

describe("Тестирование state", () => {

    describe("List", () => {
        beforeEach(() => {
            AddNewList({name: "testList", id: 0, boughtProducts: [], pendingProducts: []});
        })

        describe("при добавлении нового списка", () => {
            afterEach(() => {
                resetListsStore();
                resetNewListId();
                resetProductsStore();
                resetNewProductId();
            })

            it("изменяет длину списка", () => {
                const listsStore = $listsStore.getState();
                assert.equal(listsStore.length, 1);
            });

            it("изменяет newListId", () => {
                const newListId = $newListId.getState();
                assert.equal(newListId, 1);
            });

            it("добавляет список без ошибок", () => {
                const listsStore = $listsStore.getState();
                assert.deepEqual(listsStore[0], {name: "testList", id: 0, boughtProducts: [], pendingProducts: []});
            });
        });

        describe("при добавлении нового продукта в список", () => {
            beforeEach(() => {
                AddProductToList({
                    listId: 0,
                    product: {
                        name: "testProduct",
                        id: 0,
                        date: new Date(2020, 0, 0, 0, 0, 0, 0),
                        cost: 100,
                        amount: 1,
                        unit: UnitType.kg,
                        shop: ShopType.pyaterochka,
                        bought: false
                    }
                });
            })

            afterEach(() => {
                resetListsStore();
                resetNewListId();
                resetProductsStore();
                resetNewProductId();
            })

            it("изменяет newProductId", () => {
                const newProductId = $newProductId.getState();
                assert.equal(newProductId, 1);
            });

            it("изменяет длину pendingProducts", function () {
                const lists = $listsStore.getState();
                assert.equal(lists[0].pendingProducts.length, 1);
            });

            it("добавляет в pendingProducts id продукта", function () {
                const lists = $listsStore.getState();
                assert.equal(lists[0].pendingProducts[0], 0);
            });

            it("изменяет длину списка всех продуктов", function () {
                const products = $productsStore.getState();
                assert.equal(products.length, 1);
            });

            it("добавляет продукт в список всех продуктов", function () {
                const products = $productsStore.getState();
                assert.deepEqual(products[0], {
                    name: "testProduct",
                    id: 0,
                    date: new Date(2020, 0, 0, 0, 0, 0, 0),
                    cost: 100,
                    amount: 1,
                    unit: UnitType.kg,
                    shop: ShopType.pyaterochka,
                    bought: false
                });
            });
        });

        describe("при удалении продукта", () => {
            beforeEach(() => {
                AddProductToList({
                    listId: 0,
                    product: {
                        name: "testProduct",
                        id: 0,
                        date: new Date(2021, 1, 1, 1, 1, 1, 1),
                        price: 100,
                        cost: 100,
                        amount: 1,
                        unit: UnitType.piece,
                        shop: ShopType.verno,
                        bought: false
                    }
                });
                AddProductToList({
                    listId: 0,
                    product: {
                        name: "testProduct1",
                        id: 1,
                        date: new Date(2021, 1, 1, 1, 1, 1, 1),
                        price: 100,
                        cost: 100,
                        amount: 1,
                        unit: UnitType.piece,
                        shop: ShopType.verno,
                        bought: false
                    }
                });
                DeleteProductFromList({listId: 0, productId: 1});
            })

            afterEach(() => {
                resetListsStore();
                resetNewListId();
                resetProductsStore();
                resetNewProductId();
            })

            it("не изменяет newProductId", () => {
                const newProductId = $newProductId.getState();
                assert.equal(newProductId, 2);
            });

            it("удаляет id продукта из списка", () => {
                const listsStore = $listsStore.getState();
                assert.equal(listsStore[0].pendingProducts.length, 1);
            });

            it("удаляет продукт из списка всех продуктов", () => {
                const productsStore = $productsStore.getState();
                assert.equal(productsStore.length, 1);
            });
        });

        describe("при удалении списка", () => {
            beforeEach(() => {
                AddProductToList({
                    listId: 0,
                    product: {
                        name: "testProduct",
                        id: 0,
                        date: new Date(2020, 0, 0, 0, 0, 0, 0),
                        cost: 100,
                        amount: 1,
                        unit: UnitType.kg,
                        shop: ShopType.pyaterochka,
                        bought: false
                    }
                });
                const list = $listsStore.getState()[0]
                DeleteList({listId: list.id, productsId: [...list.pendingProducts, ...list.boughtProducts]});
            })

            afterEach(() => {
                resetListsStore();
                resetNewListId();
                resetProductsStore();
                resetNewProductId();
            })

            it("не изменяет newListId", () => {
                const newListId = $newListId.getState();
                assert.equal(newListId, 1);
            });

            it("изменяет длину списка", () => {
                const listsStore = $listsStore.getState();
                assert.equal(listsStore.length, 0);
            });

            it("удаляет продукт, находящийся в этом списке", () => {
                const productsStore = $productsStore.getState();
                assert.equal(productsStore.length, 0);
            });
        });

        describe("при редактировании продукта", () => {
            beforeEach(() => {
                AddProductToList({
                    listId: 0,
                    product: {
                        name: "testProduct",
                        id: 0,
                        date: new Date(2020, 0, 0, 0, 0, 0, 0),
                        cost: 100,
                        amount: 1,
                        unit: UnitType.kg,
                        shop: ShopType.pyaterochka,
                        bought: false
                    }
                });
                EditProduct({
                    id: 0,
                    payload: {
                        name: "testProductNEW",
                    }
                })
            })

            afterEach(() => {
                resetListsStore();
                resetNewListId();
                resetProductsStore();
                resetNewProductId();
            })

            it("не изменяет длину списка всех продуктов", () => {
                const productsStore = $productsStore.getState();
                assert.equal(productsStore.length, 1);
            });

            it("не изменяет длину списка", () => {
                const listsStore = $listsStore.getState();
                assert.equal(listsStore[0].pendingProducts.length, 1);
            });

            it("изменяет продукт", () => {
                const productsStore = $productsStore.getState();
                assert.deepEqual(productsStore[0], {
                    name: "testProductNEW",
                    id: 0,
                    date: new Date(2020, 0, 0, 0, 0, 0, 0),
                    cost: 100,
                    amount: 1,
                    unit: UnitType.kg,
                    shop: ShopType.pyaterochka,
                    bought: false
                });
            });
        });
    });
});