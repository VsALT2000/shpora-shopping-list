import React, {useEffect, useState} from "react";
import classes from './ListShoppingLists.less';
import {DeleteIcon, KebabIcon} from "../Common/Icons/Icons";
import {useNavigate} from "react-router-dom";
import action from "../ShoppingList/ShoppingListItem/Actions/Actions.less";
import AddNewItemButton from "../Common/FormControl/AddNewItemButton";
import {$listsStore, AddNewList} from "../../models/productsList/ProductsListStore";
import {useStore} from "effector-react";
import {ProductsListType} from "../../types/types";

const ItemListShoppingLists: React.FC<ProductsListType> = (props) => {
    const navigate = useNavigate();
    const [openedKebab, setOpenedKebab] = useState(true);
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
        <div className={classes.itemWrapper}>
            <div className={classes.itemContentLeftPart} onClick={() => navigate(`/${props.id}`)}>
                <label>{props.name}</label>
            </div>
            <div>
                <div className={action.actionsWrapper}>
                    <div className={action.action}>
                        <div
                            className={`${action.kebab} ${openedKebab ? action.openedOptions : action.closedOptions}`}
                            onClick={clickKebabHandler}>
                            <KebabIcon/>
                        </div>
                        <div
                            className={`${action.trashCan} ${openedKebab ? action.closedOptions : action.openedOptions}`}
                            onClick={() => console.log("click")}>
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

    const dateOption = {
        year: 'numeric', month: 'numeric', day: 'numeric',
        hour: 'numeric', minute: 'numeric'
    };

    const onAddNewList = () => {
        // @ts-ignore
        const date = new Intl.DateTimeFormat('ru', dateOption).format(new Date());
        AddNewList({
            name: date,
            id: 0,
            boughtProducts: [],
            pendingProducts: [],
        })
    }

    return (
        <>
            <div className={classes.shoppingList}>
                {
                    lists.map(list => <ItemListShoppingLists key={list.id} {...list}/>)
                }
                <AddNewItemButton onClick={onAddNewList}/>
            </div>
        </>
    );
}

export default ListShoppingLists;
