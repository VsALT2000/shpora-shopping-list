import React, {useRef} from "react";
import {AddNewList, EditList} from "../../../models/productsList/ProductsListStore";
import styles from './ListInput.less';
import {$newListId} from "../../../models/productsList/ProductsListCountStore";
import {useStore} from "effector-react";

interface Props {
    closeInput: () => void;
    id?: number;
}

const ListInput: React.FC<Props> = ({closeInput, id}) => {
    const input: React.RefObject<HTMLInputElement> = useRef(null);
    const newListId = useStore($newListId);

    const dateOption = {
        year: 'numeric', month: 'numeric', day: 'numeric',
        hour: 'numeric', minute: 'numeric'
    };

    const onSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        e.stopPropagation();
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
    }

    return (
        <form onSubmit={onSubmit} onBlur={onSubmit}>
            <input ref={input} className={styles.CustomInput} autoFocus={true} type={"text"}/>
        </form>
    );
}

export default ListInput;