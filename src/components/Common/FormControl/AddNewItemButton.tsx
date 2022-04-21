import {AddNewItemIcon} from "../Icons/Icons";
import styles from './AddNewItemButton.less';
import React from "react";

interface PropsType {
    onClick: () => void;
}

const AddNewItemButton: React.FC<PropsType> = ({onClick}) => {
    return (
        <div className={styles.addNewItemButton}>
            <div className={styles.addNewItemButtonBackground} onClick={onClick}>
                <AddNewItemIcon/>
            </div>
        </div>
    );
}

export default AddNewItemButton;
