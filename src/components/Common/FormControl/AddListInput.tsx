import React, {useRef} from "react";
import {AddNewList} from "../../../models/productsList/ProductsListStore";
import styles from './AddListInput.less';
import {$NewListId} from "../../../models/productsList/ProductsListCountStore";
import {useStore} from "effector-react";

interface Props {
    closeInput: () => void;
}

const AddListInput: React.FC<Props> = ({closeInput}) => {
    const input: React.RefObject<HTMLInputElement> = useRef(null);
    const newListId = useStore($NewListId);

    const dateOption = {
        year: 'numeric', month: 'numeric', day: 'numeric',
        hour: 'numeric', minute: 'numeric'
    };

    const onAddNewList = (e: React.SyntheticEvent) => {
        e.preventDefault();
        // @ts-ignore
        const date = new Intl.DateTimeFormat('ru', dateOption).format(new Date());
        AddNewList({
            name: input.current?.value || date,
            id: newListId,
            boughtProducts: [],
            pendingProducts: [],
        });
        closeInput();
    }

    return (
        <form className={styles.itemWrapper} onSubmit={onAddNewList} onBlur={onAddNewList}>
            <input ref={input} className={styles.CustomInput} autoFocus={true} type={"text"}/>
        </form>
    );
}

export default AddListInput;