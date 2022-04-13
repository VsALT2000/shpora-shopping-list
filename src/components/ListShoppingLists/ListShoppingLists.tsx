import React, {useState} from "react";
import classes from './ListShoppingLists.less';
import {DeleteIcon, KebabIcon} from "../Common/Icons/Icons";
import {useNavigate} from "react-router-dom";
import action from "../ShoppingList/ShoppingListItem/Actions/Actions.less";
import AddNewItemButton from "../Common/FormControl/AddNewItemButton";

const ItemListShoppingLists = (props: any) => {
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
                <label>Список {props.id}</label>
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
    const [state] = useState([{id: 0, name: "", archived: false, products: [0, 3], boughtProducts: [1]}, {
        id: 1,
        archived: true,
        products: [],
        boughtProducts: [2]
    }])

    return (
        <div className={classes.shoppingList}>
            {
                state.map(list => <ItemListShoppingLists key={list.id} {...list}/>)
            }
            <AddNewItemButton onClick={() => console.log('click')}/>
        </div>
    );
}

export default ListShoppingLists;
