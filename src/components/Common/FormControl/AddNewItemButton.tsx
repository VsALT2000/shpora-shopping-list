import {AddNewItemIcon} from "../Icons/Icons";
import styles from './AddNewItemButton.less';
import React from "react";

interface PropsType {
    onClick: (e: React.SyntheticEvent) => void;
    buttonName: string;
}

const AddNewItemButton: React.FC<PropsType> = ({onClick, buttonName}) => {
    return (
        <div className={styles.addNewItemButton}>
            <div className={styles.addNewItemButtonBackground} onClick={onClick}>
                <AddNewItemIcon/>
                <p>{buttonName}</p>
            </div>
        </div>
    );
}

export default AddNewItemButton;
