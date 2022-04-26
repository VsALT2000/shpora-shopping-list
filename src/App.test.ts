import {
    $listsStore,
    AddNewList,
    AddProductToList,
    DeleteList,
    DeleteProductFromList, EditList,
    ToggleProductBoughtState
} from "./models/productsList/ProductsListStore";
import {ShopType, SortOrder, UnitType} from "./types/types";
import assert from "assert";
import {$newListId} from "./models/productsList/ProductsListCountStore";
import {createEvent} from "effector";
import './models/init'
import {$productsStore, EditProduct} from "./models/allProducts/ProductsStore";
import {$newProductId} from "./models/allProducts/ProductsCountStore";
import {$activeFilters, ChangeFilter} from "./models/filteredProducts/FilteredProductStore";
import {$activeSort, ChangeSort} from "./models/sortedProducts/SortedProductStore";
import {sortingFunctions} from "./utils/Utils";

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

describe("Все тесты", () => {
    describe("Тестирование state", () => {
        afterEach(() => {
            resetListsStore();
            resetNewListId();
            resetProductsStore();
            resetNewProductId();
            resetSort();
            resetFilters();
        })

        describe("List:", () => {
            beforeEach(() => {
                AddNewList({name: "testList", id: 0, boughtProducts: [], pendingProducts: []});
            })

            describe("изначально", () => {
                beforeEach(() => {
                    resetListsStore();
                    resetNewListId();
                })

                it("пустой", () => {
                    const listsStore = $listsStore.getState();
                    assert.equal(listsStore.length, 0);
                });

                it("newListId равен 0", () => {
                    const newListId = $newListId.getState();
                    assert.equal(newListId, 0);
                });
            });

            describe("при добавлении нового списка", () => {
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

            it("при редактировании списка корректно меняет название списка", () => {
                EditList({listId: 0, newName: "testListNEW"});
                const listsStore = $listsStore.getState();
                assert.equal(listsStore[0].name, "testListNEW");
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

                it("не изменяет длину списка всех продуктов", () => {
                    const productsStore = $productsStore.getState();
                    assert.equal(productsStore.length, 1);
                });

                it("не изменяет длину списка", () => {
                    const listsStore = $listsStore.getState();
                    assert.equal(listsStore[0].pendingProducts.length, 1);
                });

                it("не изменяет newListId", () => {
                    const newListId = $newListId.getState();
                    assert.equal(newListId, 1);
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

            describe("при покупке продукта", () => {
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
                    ToggleProductBoughtState({listId: 0, productId: 0});
                })

                it("пропадает из pendingProducts", () => {
                    const listsStore = $listsStore.getState();
                    assert.equal(listsStore[0].pendingProducts.length, 0);
                });

                it("появляется в boughtProducts", () => {
                    const listsStore = $listsStore.getState();
                    assert.equal(listsStore[0].boughtProducts.length, 1);
                });

                it("меняется значение в списке всех продуктов", () => {
                    const productsStore = $productsStore.getState();
                    assert.equal(productsStore[0].bought, true);
                });
            });
        });

        describe("Products:", () => {
            describe("изначально", () => {
                it("пустой", () => {
                    const productsStore = $productsStore.getState();
                    assert.deepEqual(productsStore, []);
                });

                it("newProductId равен 0", () => {
                    const newProductId = $newProductId.getState();
                    assert.deepEqual(newProductId, 0);
                });
            });
        });

        describe("Filter:", () => {
            describe("при установке фильтра", () => {
                it("изменяется фильтр", () => {
                    ChangeFilter([ShopType.verno, ShopType.pyaterochka])
                    const activeFilters = $activeFilters.getState();
                    assert.deepEqual(activeFilters, [ShopType.verno, ShopType.pyaterochka]);
                });
            });

            describe("изначально", () => {
                it("пустой", () => {
                    const activeFilters = $activeFilters.getState();
                    assert.deepEqual(activeFilters, []);
                });
            });
        });

        describe("Sort:", () => {
            describe("при установке сортировки", () => {
                it("изменяется сортировка", () => {
                    ChangeSort(SortOrder.firstCheap)
                    const activeSort = $activeSort.getState();
                    assert.deepEqual(activeSort, SortOrder.firstCheap);
                });
            });

            describe("изначально", () => {
                it("показывает сначала новые", () => {
                    const activeSort = $activeSort.getState();
                    assert.deepEqual(activeSort, SortOrder.firstNew);
                });
            });
        });
    });

    describe("Тестирование функций", () => {
        afterEach(() => {
            resetListsStore();
            resetNewListId();
            resetProductsStore();
            resetNewProductId();
            resetSort();
            resetFilters();
        })

        describe("Sort:", () => {
            beforeEach(() => {
                AddNewList({name: "testList", id: 0, boughtProducts: [], pendingProducts: []});
            })

            describe("По названию", () => {
                it("По названию", () => {
                    const testProduct0 = {
                        name: "Сахар",
                        id: 0,
                        date: new Date(2020, 0, 0, 0, 0, 0, 0),
                        cost: 100,
                        amount: 1,
                        unit: UnitType.kg,
                        shop: ShopType.pyaterochka,
                        bought: false
                    }
                    const testProduct1 = {
                        name: "Арбуз",
                        id: 1,
                        date: new Date(2020, 0, 0, 0, 0, 0, 0),
                        cost: 100,
                        amount: 1,
                        unit: UnitType.kg,
                        shop: ShopType.pyaterochka,
                        bought: false
                    }
                    const testProduct2 = {
                        name: "Масло",
                        id: 2,
                        date: new Date(2020, 0, 0, 0, 0, 0, 0),
                        cost: 100,
                        amount: 1,
                        unit: UnitType.kg,
                        shop: ShopType.pyaterochka,
                        bought: false
                    }
                    AddProductToList({listId: 0, product: testProduct0});
                    AddProductToList({listId: 0, product: testProduct1});
                    AddProductToList({listId: 0, product: testProduct2});
                    const products = $productsStore.getState();
                    products.sort(sortingFunctions[SortOrder.alphabetically])

                    assert.deepEqual(products, [testProduct1, testProduct2, testProduct0]);
                })

                it("По названию без учёта регистра", () => {
                    const testProduct0 = {
                        name: "САХАР",
                        id: 0,
                        date: new Date(2020, 0, 0, 0, 0, 0, 0),
                        cost: 100,
                        amount: 1,
                        unit: UnitType.kg,
                        shop: ShopType.pyaterochka,
                        bought: false
                    }
                    const testProduct1 = {
                        name: "сахар",
                        id: 1,
                        date: new Date(2020, 0, 0, 0, 0, 0, 0),
                        cost: 100,
                        amount: 1,
                        unit: UnitType.kg,
                        shop: ShopType.pyaterochka,
                        bought: false
                    }
                    const testProduct2 = {
                        name: "СаХаР",
                        id: 2,
                        date: new Date(2020, 0, 0, 0, 0, 0, 0),
                        cost: 100,
                        amount: 1,
                        unit: UnitType.kg,
                        shop: ShopType.pyaterochka,
                        bought: false
                    }
                    AddProductToList({listId: 0, product: testProduct0});
                    AddProductToList({listId: 0, product: testProduct1});
                    AddProductToList({listId: 0, product: testProduct2});
                    const products = $productsStore.getState();
                    products.sort(sortingFunctions[SortOrder.alphabetically])

                    assert.deepEqual(products, [testProduct0, testProduct1, testProduct2]);
                });

                it("По названию с числами", () => {
                    const testProduct0 = {
                        name: "test1",
                        id: 0,
                        date: new Date(2020, 0, 0, 0, 0, 0, 0),
                        cost: 100,
                        amount: 1,
                        unit: UnitType.kg,
                        shop: ShopType.pyaterochka,
                        bought: false
                    }
                    const testProduct1 = {
                        name: "test111",
                        id: 1,
                        date: new Date(2020, 0, 0, 0, 0, 0, 0),
                        cost: 100,
                        amount: 1,
                        unit: UnitType.kg,
                        shop: ShopType.pyaterochka,
                        bought: false
                    }
                    const testProduct2 = {
                        name: "test101",
                        id: 2,
                        date: new Date(2020, 0, 0, 0, 0, 0, 0),
                        cost: 100,
                        amount: 1,
                        unit: UnitType.kg,
                        shop: ShopType.pyaterochka,
                        bought: false
                    }
                    AddProductToList({listId: 0, product: testProduct0});
                    AddProductToList({listId: 0, product: testProduct1});
                    AddProductToList({listId: 0, product: testProduct2});
                    const products = $productsStore.getState();
                    products.sort(sortingFunctions[SortOrder.alphabetically])

                    assert.deepEqual(products, [testProduct0, testProduct2, testProduct1]);
                });
            });

            describe("По цене", () => {
                const testProduct0 = {
                    name: "Сахар",
                    id: 0,
                    date: new Date(2020, 0, 0, 0, 0, 0, 0),
                    cost: 100,
                    amount: 1,
                    unit: UnitType.kg,
                    shop: ShopType.pyaterochka,
                    bought: false
                }
                const testProduct1 = {
                    name: "Арбуз",
                    id: 1,
                    date: new Date(2020, 0, 0, 0, 0, 0, 0),
                    price: 100,
                    cost: 1000,
                    amount: 10,
                    unit: UnitType.kg,
                    shop: ShopType.pyaterochka,
                    bought: false
                }
                const testProduct2 = {
                    name: "Масло",
                    id: 2,
                    date: new Date(2020, 0, 0, 0, 0, 0, 0),
                    cost: 10.14,
                    amount: 1,
                    unit: UnitType.kg,
                    shop: ShopType.pyaterochka,
                    bought: false
                }

                beforeEach(() => {
                    AddProductToList({listId: 0, product: testProduct0});
                    AddProductToList({listId: 0, product: testProduct1});
                    AddProductToList({listId: 0, product: testProduct2});
                })

                it("Сначала дорогие", () => {
                    const products = $productsStore.getState();
                    products.sort(sortingFunctions[SortOrder.firstExpensive])

                    assert.deepEqual(products, [testProduct1, testProduct0, testProduct2]);
                });

                it("Сначала дешёвые", () => {
                    const products = $productsStore.getState();
                    products.sort(sortingFunctions[SortOrder.firstCheap])

                    assert.deepEqual(products, [testProduct2, testProduct0, testProduct1]);
                });
            });

            describe("По дате добавления", () => {
                const testProduct0 = {
                    name: "Сахар",
                    id: 0,
                    date: new Date(0),
                    cost: 100,
                    amount: 1,
                    unit: UnitType.kg,
                    shop: ShopType.pyaterochka,
                    bought: false
                }
                const testProduct1 = {
                    name: "Арбуз",
                    id: 1,
                    date: new Date(2022, 5, 25, 16, 20, 23, 5),
                    price: 100,
                    cost: 1000,
                    amount: 10,
                    unit: UnitType.kg,
                    shop: ShopType.pyaterochka,
                    bought: false
                }
                const testProduct2 = {
                    name: "Масло",
                    id: 2,
                    date: new Date(2020, 0, 0, 0, 0, 0, 0),
                    cost: 10.14,
                    amount: 1,
                    unit: UnitType.kg,
                    shop: ShopType.pyaterochka,
                    bought: false
                }

                beforeEach(() => {
                    AddProductToList({listId: 0, product: testProduct0});
                    AddProductToList({listId: 0, product: testProduct1});
                    AddProductToList({listId: 0, product: testProduct2});
                })

                it("Сначала новые", () => {
                    const products = $productsStore.getState();
                    products.sort(sortingFunctions[SortOrder.firstNew])

                    assert.deepEqual(products, [testProduct1, testProduct2, testProduct0]);
                });

                it("Сначала старые", () => {
                    const products = $productsStore.getState();
                    products.sort(sortingFunctions[SortOrder.firstOld])

                    assert.deepEqual(products, [testProduct0, testProduct2, testProduct1]);
                });
            });
        });

        describe("Filter:", () => {
            beforeEach(() => {
                AddNewList({name: "testList", id: 0, boughtProducts: [], pendingProducts: []});
            })

            it("При множественном выборе показывает отфильтрованные продукты", () => {
                const testProduct0 = {
                    name: "Сахар",
                    id: 0,
                    date: new Date(2020, 0, 0, 0, 0, 0, 0),
                    cost: 100,
                    amount: 1,
                    unit: UnitType.kg,
                    shop: ShopType.pyaterochka,
                    bought: false
                }
                const testProduct1 = {
                    name: "Арбуз",
                    id: 1,
                    date: new Date(2020, 0, 0, 0, 0, 0, 0),
                    cost: 100,
                    amount: 1,
                    unit: UnitType.kg,
                    shop: ShopType.verno,
                    bought: false
                }
                const testProduct2 = {
                    name: "Масло",
                    id: 2,
                    date: new Date(2020, 0, 0, 0, 0, 0, 0),
                    cost: 100,
                    amount: 1,
                    unit: UnitType.kg,
                    shop: ShopType.perekrestok,
                    bought: false
                }
                AddProductToList({listId: 0, product: testProduct0});
                AddProductToList({listId: 0, product: testProduct1});
                AddProductToList({listId: 0, product: testProduct2});
                ChangeFilter([ShopType.perekrestok, ShopType.verno])
                let products = $productsStore.getState();
                const filters = $activeFilters.getState();
                products = products.filter((product) => (filters.includes(product.shop as ShopType)));

                assert.deepEqual(products, [testProduct1, testProduct2]);
            })

            it("При единичном выборе показывает отфильтрованные продукты", () => {
                const testProduct0 = {
                    name: "Сахар",
                    id: 0,
                    date: new Date(2020, 0, 0, 0, 0, 0, 0),
                    cost: 100,
                    amount: 1,
                    unit: UnitType.kg,
                    shop: ShopType.verno,
                    bought: false
                }
                const testProduct1 = {
                    name: "Арбуз",
                    id: 1,
                    date: new Date(2020, 0, 0, 0, 0, 0, 0),
                    cost: 100,
                    amount: 1,
                    unit: UnitType.kg,
                    shop: ShopType.verno,
                    bought: false
                }
                const testProduct2 = {
                    name: "Масло",
                    id: 2,
                    date: new Date(2020, 0, 0, 0, 0, 0, 0),
                    cost: 100,
                    amount: 1,
                    unit: UnitType.kg,
                    shop: ShopType.perekrestok,
                    bought: false
                }
                AddProductToList({listId: 0, product: testProduct0});
                AddProductToList({listId: 0, product: testProduct1});
                AddProductToList({listId: 0, product: testProduct2});
                ChangeFilter([ShopType.verno])
                let products = $productsStore.getState();
                const filters = $activeFilters.getState();
                products = products.filter((product) => (filters.includes(product.shop as ShopType)));

                assert.deepEqual(products, [testProduct0, testProduct1]);
            });

            it("При отсутсвии подходящих вариантов возвращает пустой массив", () => {
                const testProduct0 = {
                    name: "Сахар",
                    id: 0,
                    date: new Date(2020, 0, 0, 0, 0, 0, 0),
                    cost: 100,
                    amount: 1,
                    unit: UnitType.kg,
                    shop: ShopType.perekrestok,
                    bought: false
                }
                const testProduct1 = {
                    name: "Арбуз",
                    id: 1,
                    date: new Date(2020, 0, 0, 0, 0, 0, 0),
                    cost: 100,
                    amount: 1,
                    unit: UnitType.kg,
                    shop: ShopType.perekrestok,
                    bought: false
                }
                const testProduct2 = {
                    name: "Масло",
                    id: 2,
                    date: new Date(2020, 0, 0, 0, 0, 0, 0),
                    cost: 100,
                    amount: 1,
                    unit: UnitType.kg,
                    shop: ShopType.perekrestok,
                    bought: false
                }
                AddProductToList({listId: 0, product: testProduct0});
                AddProductToList({listId: 0, product: testProduct1});
                AddProductToList({listId: 0, product: testProduct2});
                ChangeFilter([ShopType.verno])
                let products = $productsStore.getState();
                const filters = $activeFilters.getState();
                products = products.filter((product) => (filters.includes(product.shop as ShopType)));

                assert.deepEqual(products, []);
            });

            it("При отсутсвии магазина не выводит продукт", () => {
                const testProduct0 = {
                    name: "Сахар",
                    id: 0,
                    date: new Date(2020, 0, 0, 0, 0, 0, 0),
                    cost: 100,
                    amount: 1,
                    unit: UnitType.kg,
                    bought: false
                }
                const testProduct1 = {
                    name: "Арбуз",
                    id: 1,
                    date: new Date(2020, 0, 0, 0, 0, 0, 0),
                    cost: 100,
                    amount: 1,
                    unit: UnitType.kg,
                    bought: false
                }
                const testProduct2 = {
                    name: "Масло",
                    id: 2,
                    date: new Date(2020, 0, 0, 0, 0, 0, 0),
                    cost: 100,
                    amount: 1,
                    unit: UnitType.kg,
                    bought: false
                }
                AddProductToList({listId: 0, product: testProduct0});
                AddProductToList({listId: 0, product: testProduct1});
                AddProductToList({listId: 0, product: testProduct2});
                ChangeFilter([ShopType.verno])
                let products = $productsStore.getState();
                const filters = $activeFilters.getState();
                products = products.filter((product) => (filters.includes(product.shop as ShopType)));

                assert.deepEqual(products, []);
            });
        });
    });
});