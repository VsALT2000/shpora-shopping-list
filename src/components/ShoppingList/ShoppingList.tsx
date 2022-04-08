import React, {useEffect} from "react";
import {ShoppingListItem} from "./ShoppingListItem/ShoppingListItem";
import styles from "./ShoppingList.less";
import {useState} from "react";
import {$products} from "../../models/filteredProducts/FilteredProductStore";
import {useStore} from "effector-react";
import {ShoppingListFilter} from "./ShoppingListFilter/ShoppingListFilter";
import {ShoppingListSort} from "./ShoppingListSort/ShoppingListSort";
import {sortingFunctions} from "../../utils/Utils";

export enum sortOrderEnum {
    new = "Сначала новые",
    old = "Сначала старые",
    alph = "По алфавиту",
    cheap = "Сначала недорогие",
    exp = "Сначала дорогие",
}

interface ShoppingListProps {
    onOpenForm: (state: boolean) => void;
}

export const ShoppingList: React.FC<ShoppingListProps> = (props) => {
    const [openedSort, setOpenedSort] = useState(false);
    const [openedFilter, setOpenedFilter] = useState(false);
    const [sortOrder, setSortOrder] = useState<sortOrderEnum>(sortOrderEnum.new);

    const changeSortOrderHandler = (newSortOrder: sortOrderEnum) => {
        setSortOrder(newSortOrder);
        setOpenedSort(false);
    };

    useEffect(
        () => {
            console.log(1)
        },
        [openedSort]
    )


    const openFilterHandler = () => {
        if (openedSort) {
            setOpenedSort(false);
        }
        setOpenedFilter(true);
    };

    const closeFilterHandler = () => {
        setOpenedFilter(false);
    };

    const openSortHandler = () => {
        if (openedFilter) {
            setOpenedFilter(false);
        }
        setOpenedSort(true);
    };

    const products = useStore($products);
    const total = products.reduce((sum, {price, amount}) => (price ? sum + price * amount : sum), 0);

    return (
        <div className={styles.shoppingList}>
            <div className={styles.shoppingListHeader}>
                <h2>Список покупок</h2>
                <svg onClick={openFilterHandler} width="18" height="19" viewBox="0 0 18 19" fill="none">
                    <path
                        d="M15.1315 1H2.86852C2.06982 1 1.59343 1.89015 2.03647 2.5547L6.83205 9.74808C6.94156 9.91234 7 10.1054 7 10.3028V16.382C7 17.1253 7.78231 17.6088 8.44721 17.2764L10.4472 16.2764C10.786 16.107 11 15.7607 11 15.382V10.3028C11 10.1054 11.0584 9.91234 11.1679 9.74808L15.9635 2.5547C16.4066 1.89015 15.9302 1 15.1315 1Z"
                        stroke="#000000" strokeWidth="2"/>
                </svg>
                {openedFilter && <ShoppingListFilter onCloseFilter={closeFilterHandler}/>}
                <svg onClick={openSortHandler} width="20" height="18" viewBox="0 0 20 18" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd"
                          d="M4 0.5C4.55228 0.5 5 0.947715 5 1.5V14.0858L6.29289 12.7929C6.68342 12.4024 7.31658 12.4024 7.70711 12.7929C8.09763 13.1834 8.09763 13.8166 7.70711 14.2071L4.70711 17.2071C4.31658 17.5976 3.68342 17.5976 3.29289 17.2071L0.292893 14.2071C-0.0976311 13.8166 -0.0976311 13.1834 0.292893 12.7929C0.683418 12.4024 1.31658 12.4024 1.70711 12.7929L3 14.0858V1.5C3 0.947715 3.44772 0.5 4 0.5ZM9 1.5C9 0.947715 9.44771 0.5 10 0.5H19C19.5523 0.5 20 0.947715 20 1.5C20 2.05228 19.5523 2.5 19 2.5H10C9.44771 2.5 9 2.05228 9 1.5ZM10 5.5C9.44771 5.5 9 5.94772 9 6.5C9 7.05228 9.44771 7.5 10 7.5H17C17.5523 7.5 18 7.05228 18 6.5C18 5.94772 17.5523 5.5 17 5.5H10ZM9 11.5C9 10.9477 9.44771 10.5 10 10.5H15C15.5523 10.5 16 10.9477 16 11.5C16 12.0523 15.5523 12.5 15 12.5H10C9.44771 12.5 9 12.0523 9 11.5ZM10 15.5C9.44771 15.5 9 15.9477 9 16.5C9 17.0523 9.44771 17.5 10 17.5H13C13.5523 17.5 14 17.0523 14 16.5C14 15.9477 13.5523 15.5 13 15.5H10Z"
                          fill="#000000"/>
                </svg>
                {openedSort && <ShoppingListSort currentSortOrder={sortOrder} sortOrderList={sortOrderEnum}
                                                 onChangeSortOrder={changeSortOrderHandler}/>}
            </div>
            <div className={styles.shoppingListItems}>
                {products.sort(sortingFunctions[sortOrder]).map((product) => (
                    <ShoppingListItem {...product} key={product.id}/>
                ))}
            </div>
            <div className={styles.shoppingListTotal}>{products.length > 0 ? <p>Общая сумма: {total}₽</p> :
                <p>cписок пуст...</p>}</div>
            <div className={styles.addNewItemButton} onClick={() => {
                props.onOpenForm(true)
            }}>
                <div className={styles.addNewItemButtonBackground}>
                    <svg width="46" height="46" viewBox="0 0 46 46" fill="none">
                        <path d="M23 3V23M23 23V43M23 23H3M23 23H43" stroke="#ffffff" strokeWidth="6"
                              strokeLinecap="round"/>
                    </svg>
                </div>
            </div>
        </div>
    );
};
