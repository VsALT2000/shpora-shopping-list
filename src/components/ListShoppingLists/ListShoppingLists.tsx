import React, {useEffect, useState} from "react";
import styles from './ListShoppingLists.less';
import {DeleteIcon, EditIcon, KebabIcon} from "../Common/Icons/Icons";
import {useNavigate} from "react-router-dom";
import actionStyles from "../ShoppingList/ShoppingListItem/Actions/Actions.less";
import AddNewItemButton from "../Common/FormControl/AddNewItemButton";
import {$listsStore, DeleteList} from "../../models/productsList/ProductsListStore";
import {useStore} from "effector-react";
import {ProductsListType, ProductType} from "../../types/types";
import ListInput from "../Common/FormControl/ListInput";
import cn from "classnames";
import {$productsStore} from "../../models/allProducts/ProductsStore";

const ItemListShoppingLists: React.FC<ProductsListType> = (props) => {
    const products = useStore($productsStore);
    const navigate = useNavigate();
    const [openedKebab, setOpenedKebab] = useState(true);
    const [input, setInput] = useState(false);

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

    let pendingProducts = props.pendingProducts.map((id) => products.find((product) => product.id === id) as ProductType);
    let boughtProducts = props.boughtProducts.map((id) => products.find((product) => product.id === id) as ProductType);

    return (
        <div className={styles.itemWrapper}>
            <div className={styles.itemContentLeftPart} onClick={() => navigate(`/${props.id}`)}>
                {
                    input
                        ? <ListInput id={props.id} closeInput={() => setInput(false)}/>
                        : <label>{props.name}</label>
                }
            </div>
            <div>
                <div className={actionStyles.actionsWrapper}>
                    <div className={actionStyles.action}>
                        <div
                            className={cn(actionStyles.kebab, {[actionStyles.openedOptions]: openedKebab})}
                            onClick={clickKebabHandler}>
                            <KebabIcon/>
                        </div>
                        <div className={cn(actionStyles.blueIcon, {[actionStyles.openedOptions]: !openedKebab})}
                             onClick={() => setInput(true)}>
                            <EditIcon/>
                        </div>
                        <div
                            className={cn(actionStyles.redIcon, {[actionStyles.openedOptions]: !openedKebab})}
                            onClick={() => DeleteList({
                                listId: props.id,
                                productsId: [...props.pendingProducts, ...props.boughtProducts]
                            })}>
                            <DeleteIcon/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const ListShoppingLists = () => {
    const lists = useStore($listsStore);
    const [input, setInput] = useState(false);
    const navigate = useNavigate();

    return (
        <>
            <div className={styles.shoppingList}>
                <div className={styles.shoppingListHeader}>
                    <h2>Список покупок</h2>
                </div>
                <div className={styles.itemWrapper}>
                    <div className={styles.itemContentLeftPart} onClick={() => navigate(`/all`)}>
                        <label>Все покупки</label>
                    </div>
                </div>
                {
                    lists.map(list => <ItemListShoppingLists key={list.id} {...list}/>)
                }
                {
                    input && <div className={styles.inputWrapper}>
                        <ListInput closeInput={() => setInput(false)}/>
                    </div>
                }
                <AddNewItemButton onClick={() => setInput(true)}/>
            </div>
        </>
    );
}

export default ListShoppingLists;
