import React from 'react';
import {Button} from "../FormControl/Button";
import classes from './Modal.less';

interface PropsTypes {
    header: string
    nameButton?: string
    onApply?: (event: React.SyntheticEvent) => void
    onAbort: (event: React.SyntheticEvent) => void
}

const Modal: React.FC<PropsTypes> = (props) => {
    return (
        <div className={classes.modalWrapper}>
            <div className={classes.modalContainer}>
                <h1>{props.header}</h1>
                {props.children}
                <Button onClick={props.onApply}>{props.nameButton || "Применить"}</Button>
            </div>
            <div className={classes.backdrop} onClick={props.onAbort}/>
        </div>
    );
};

export default Modal;
