import React, { useRef } from "react";
import { AddNewList } from "../../../models/productsList/ProductsListStore";
import styles from "./AddListInput.less";
import { $newListId } from "../../../models/productsList/ProductsListCountStore";
import { useStore } from "effector-react";
import { ArrowBackIcon } from "../Icons/Icons";
import { useNavigate, useParams } from "react-router-dom";
import AddNewItemButton from "../../Common/FormControl/AddNewItemButton";
import {ReturnHeader} from './ReturnHeader'

interface Props {
    closeInput: () => void;
}

const AddListInput: React.FC<Props> = ({ closeInput }) => {
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

    const onAddNewList = (e: React.SyntheticEvent) => {
        e.preventDefault();
        // @ts-ignore
        const date = new Intl.DateTimeFormat("ru", dateOption).format(new Date());
        AddNewList({
            name: input.current?.value || "Новый список",
            id: newListId,
            boughtProducts: [],
            pendingProducts: [],
        });
        closeInput();
    };

    return (
        <div className={styles.newLists}>
            <ReturnHeader closeInput={closeInput}/>
            <div className={styles.newLists2}>
                <form onSubmit={onAddNewList}>
                    <h1>Название списка</h1>
                    <input ref={input} className={styles.CustomInput} type={"text"} placeholder="Новый список"/>
                    <AddNewItemButton buttonName="Создать" onClick={onAddNewList} />
                </form>
            </div>
        </div>
    );
};

export default AddListInput;
