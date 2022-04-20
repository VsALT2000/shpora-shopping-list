import React, {useRef, useState} from "react";
import classes from './ListShoppingLists.less';
import {ArchiveIcon, KebabIcon} from "../Common/Icons/Icons";
import {useNavigate} from "react-router-dom";
import action from "../ShoppingList/ShoppingListItem/Actions/Actions.less";
import AddNewItemButton from "../Common/FormControl/AddNewItemButton";
import {$listsStore} from "../../models/productsList/ProductsListStore";
import {useStore} from "effector-react";
import {ProductsListType} from "../../types/types";
import AddListInput from "../Common/FormControl/AddListInput";

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
                            <ArchiveIcon/>
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
            <div className={classes.shoppingList}>
                <h2>Список покупок</h2>
                <div className={classes.itemWrapper}>
                    <div className={classes.itemContentLeftPart} onClick={() => navigate(`/all`)}>
                        Все покупки
                    </div>
                </div>
                {
                    lists.map(list => <ItemListShoppingLists key={list.id} {...list}/>)
                }
                {
                    input && <AddListInput closeInput={() => setInput(false)}/>
                }
                <AddNewItemButton onClick={() => setInput(true)}/>
            </div>
        </>
    );
}

export default ListShoppingLists;
