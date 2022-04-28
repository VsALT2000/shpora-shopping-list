import React, { useEffect, useState } from "react";
import styles from "./ListShoppingLists.less";
import { useNavigate } from "react-router-dom";
import actionStyles from "../ShoppingList/ShoppingListItem/Actions/Actions.less";
import AddNewItemButton from "../Common/FormControl/AddNewItemButton";
import { $listsStore, DeleteList } from "../../models/productsList/ProductsListStore";
import { useStore } from "effector-react";
import { ProductsListType } from "../../types/types";
import ListInput from "../Common/FormControl/ListInput";
import { DeleteIcon, EditIcon, EmptyList, KebabIcon } from "../Common/Icons/Icons";
import { $productsStore } from "../../models/allProducts/ProductsStore";

const ItemListShoppingLists: React.FC<ProductsListType> = (props) => {
    const navigate = useNavigate();
    const [openedKebab, setOpenedKebab] = useState(true);
    const [newListWindow, setNewListWindow] = useState(false);

    useEffect(() => () => setOpenedKebab(true), []);

    const closeKebab = () => {
        setOpenedKebab(true);
        window.removeEventListener("click", closeKebab);
    };
    const clickKebabHandler = (event: React.SyntheticEvent) => {
        event.stopPropagation();
        setOpenedKebab(false);
        window.addEventListener("click", closeKebab);
    };

    const onDelete = (e: React.SyntheticEvent) => {
        e.stopPropagation();
        DeleteList({ listId: props.id, productsId: [...props.pendingProducts, ...props.boughtProducts] });
    };

    const onEdit = (e: React.SyntheticEvent) => {
        e.stopPropagation();
        setNewListWindow(true);
    };

    return (
        <>
            <button className={styles.itemWrapper} onClick={() => navigate(`/${props.id}`)}>
                <div className={styles.itemContentWrapper}>
                    <div className={styles.itemContentLeftPart} onClick={() => navigate(`/${props.id}`)}>
                        <label>{props.name}</label>
                    </div>
                    <div className={styles.clickZone} onClick={clickKebabHandler}>
                        <div className={actionStyles.actionsWrapper}>
                            <div className={actionStyles.kebab}>
                                <KebabIcon />
                            </div>
                            {!openedKebab && (
                                <div className={styles.actions}>
                                    <div className={styles.kebabIcons} onClick={onEdit}>
                                        <EditIcon />
                                        <p>Изменить</p>
                                    </div>
                                    <div className={styles.kebabIcons} onClick={onDelete}>
                                        <DeleteIcon />
                                        <p>Удалить</p>
                                    </div>
                                    <div className={styles.triangle} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </button>
            {newListWindow && <ListInput id={props.id} closeInput={() => setNewListWindow(false)} />}
        </>
    );
};

const ListShoppingLists = () => {
    const lists = Array.from(useStore($listsStore).values());
    const products = Array.from(useStore($productsStore).values());
    const [newListWindow, setNewListWindow] = useState(false);
    const navigate = useNavigate();

    return (
        <div id="shoppingList" className={styles.shoppingList}>
            <div className={styles.shoppingListHeader}>
                <h2>Мои списки</h2>
            </div>
            {lists.length === 0 && (
                <div id="emptyListWrapper" className={styles.emptyListWrapper}>
                    <div id="emptyListContent" className={styles.emptyListContent}>
                        <div className={styles.emptyList}>
                            <EmptyList />
                        </div>
                        <div className={styles.buttonContainer}>
                            <AddNewItemButton buttonName="Новый список" onClick={() => setNewListWindow(true)} />
                        </div>
                    </div>
                </div>
            )}
            {lists.length > 0 && (
                <div className={styles.header}>
                    <div className={styles.content}>
                        {products.length > 0 && <div key="allProducts" className={styles.allProducts} onClick={() => navigate(`/all`)}>
                            <label>Все покупки</label>
                        </div>}
                        {lists.map((list) => (
                            <ItemListShoppingLists key={list.id} {...list} />
                        ))}
                    </div>
                    <div className={styles.buttonSticky}>
                        <AddNewItemButton buttonName="Новый список" onClick={() => setNewListWindow(true)} />
                    </div>
                </div>
            )}
            {newListWindow && <ListInput closeInput={() => setNewListWindow(false)} />}
        </div>
    );
};

export default ListShoppingLists;
