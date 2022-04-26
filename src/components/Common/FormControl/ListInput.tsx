import React, {useRef} from "react";
import {AddNewList, EditList} from "../../../models/productsList/ProductsListStore";
import styles from "./ListInput.less";
import { $newListId } from "../../../models/productsList/ProductsListCountStore";
import { useStore } from "effector-react";
import { ArrowBackIcon } from "../Icons/Icons";
import { useNavigate, useParams } from "react-router-dom";
import AddNewItemButton from "../../Common/FormControl/AddNewItemButton";
import {ReturnHeader} from './ReturnHeader'

interface Props {
    closeInput: () => void;
    id?: number;
}

const ListInput: React.FC<Props> = ({closeInput, id}) => {
    const input: React.RefObject<HTMLInputElement> = useRef(null);
    const newListId = useStore($newListId);
    const navigate = useNavigate();

    const dateOption = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    };

    const onSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        // @ts-ignore
        const date = new Intl.DateTimeFormat('ru', dateOption).format(new Date());
        if (id !== undefined) {
            EditList({listId: id, newName: input.current?.value || date})
        } else {
            AddNewList({
                name: input.current?.value || date,
                id: newListId,
                boughtProducts: [],
                pendingProducts: [],
            });
        }
        closeInput();
    };

    return (
        <div className={styles.newLists}>
            <ReturnHeader closeInput={closeInput}/>
            <div className={styles.newLists2}>
                <form onSubmit={onSubmit}>
                    <h1>Название списка</h1>
                    <input ref={input} className={styles.CustomInput} type={"text"} placeholder="Новый список"/>
                    <AddNewItemButton buttonName={id === undefined ? "Создать" : "Изменить"} onClick={onSubmit} />
                </form>
            </div>
        </div>
    );
};

export default ListInput;
