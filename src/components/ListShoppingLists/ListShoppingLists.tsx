import React, { useEffect, useState } from "react";
import styles from "./ListShoppingLists.less";
import { DeleteIcon, DownloadIcon, EditIcon, KebabIcon, EmptyList } from "../Common/Icons/Icons";
import { useNavigate } from "react-router-dom";
import actionStyles from "../ShoppingList/ShoppingListItem/Actions/Actions.less";
import AddNewItemButton from "../Common/FormControl/AddNewItemButton";
import { $listsStore, DeleteList } from "../../models/productsList/ProductsListStore";
import { useStore } from "effector-react";
import { ProductsListType } from "../../types/types";
import AddListInput from "../Common/FormControl/AddListInput";

const ItemListShoppingLists: React.FC<ProductsListType> = (props) => {
    const navigate = useNavigate();
    const [openedKebab, setOpenedKebab] = useState(true);

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

    return (
        <div className={styles.itemWrapper}>
            <div className={styles.itemContentLeftPart} onClick={() => navigate(`/${props.id}`)}>
                <label>{props.name}</label>
            </div>
            <div>
                <div className={actionStyles.actionsWrapper}>
                    <div className={actionStyles.kebab} onClick={clickKebabHandler}>
                        <KebabIcon />
                    </div>
                    {!openedKebab && (
                        <div className={styles.actions}>
                            <div className={styles.kebabIcons} >
                                <EditIcon />
                                <p>Изменить</p>
                            </div>
                            <div className={styles.kebabIcons} onClick={() => console.log("Тут будет скачивание TSV")}>
                                <DownloadIcon/>
                                <p>Скачать</p>
                            </div>
                            <div className={styles.kebabIcons} onClick={() => DeleteList({listId: props.id,productsId: [...props.pendingProducts, ...props.boughtProducts]})}>
                                <DeleteIcon/>
                                <p>Удалить</p>
                            </div>
                            <div className={styles.triangle}></div>
                        </div>)}
                </div>
            </div>
        </div>
    );
};

const ListShoppingLists = () => {
    const lists = Array.from(useStore($listsStore).values());
    const [newListWindow, setNewListWindow] = useState(false);
    const navigate = useNavigate();

    return (
        <div className={styles.shoppingList}>
            <div className={styles.shoppingListHeader}>
                <h2>Мои списки</h2>
            </div>
            {lists.length === 0 && (
                <div className={styles.emptyListWrapper}>
                    <div className={styles.emptyListContent}>
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
                    <div className={styles.allProducts} onClick={() => navigate(`/all`)}>
                        <label>Все покупки</label>
                    </div>
                        {lists.map((list) => (
                            <div>
                                <ItemListShoppingLists key={list.id} {...list} />
                            </div>
                        ))}
                    </div>
                    <div className={styles.buttonSticky}>
                        <AddNewItemButton buttonName="Новый список" onClick={() => setNewListWindow(true)} />
                    </div>
                </div>
            )}
            {newListWindow && <AddListInput closeInput={() => setNewListWindow(false)} />}
        </div>
    );
};

export default ListShoppingLists;
