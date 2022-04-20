import {AddNewItemIcon} from "../Icons/Icons";
import classes from './AddNewItemButton.less';
import React from "react";

interface PropsType {
    onClick: () => void;
}

const AddNewItemButton: React.FC<PropsType> = (props) => {
    return (
        <div className={classes.addNewItemButton}>
            <div className={classes.addNewItemButtonBackground} onClick={props.onClick}>
                <AddNewItemIcon/>
            </div>
        </div>
    );
}

export default AddNewItemButton;
