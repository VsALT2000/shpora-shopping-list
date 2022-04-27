import React, { useRef, useState } from "react";
import { AddNewList, EditList } from "../../../models/productsList/ProductsListStore";
import styles from "./ListInput.less";
import { $newListId } from "../../../models/productsList/ProductsListCountStore";
import { useStore } from "effector-react";
import { useNavigate, useParams } from "react-router-dom";
import AddNewItemButton from "../../Common/FormControl/AddNewItemButton";
import { ReturnHeader } from "./ReturnHeader";
import { $listsStore } from "../../../models/productsList/ProductsListStore";

interface Props {
    closeInput: () => void;
    id?: number;
}

const ListInput: React.FC<Props> = ({ closeInput, id }) => {
    const newListId = useStore($newListId);
    const navigate = useNavigate();

    const list = useStore($listsStore).find((list) => list.id === id);
    const [listName, setListName] = useState(list ? list.name : "");

    const dateOption = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    };

    const listNameChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setListName(event.currentTarget.value);
    };

    const onSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        // @ts-ignore
        const date = new Intl.DateTimeFormat("ru", dateOption).format(new Date());
        if (id !== undefined) {
            EditList({ listId: id, newName: listName || "Список" });
        } else {
            AddNewList({
                name: listName || "Новый список",
                id: newListId,
                boughtProducts: [],
                pendingProducts: [],
            });
        }
        closeInput();
    };

    return (
        <div className={styles.newLists}>
            <ReturnHeader closeInput={closeInput} />
            <div className={styles.newLists2}>
                <form onSubmit={onSubmit}>
                    <h1>Название списка</h1>
                    <input className={styles.CustomInput} type={"text"} value={listName} onChange={listNameChangeHandler} placeholder="Новый список" />
                    <AddNewItemButton buttonName={id === undefined ? "Создать" : "Изменить"} onClick={onSubmit} />
                </form>
            </div>
        </div>
    );
};

export default ListInput;
