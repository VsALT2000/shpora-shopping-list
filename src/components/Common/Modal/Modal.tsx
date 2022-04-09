import React, {ReactElement} from 'react';
import {Button} from "../../UI/Button";
import classes from './Modal.less';

interface PropsTypes {
    header: string
    body: ReactElement
    nameButton?: string
    onApply?: (event: React.SyntheticEvent) => void
    onAbort: (event: React.SyntheticEvent) => void
}

const Modal: React.FC<PropsTypes> = (props) => {
    return (
        <div className={classes.modalWrapper}>
            <div className={classes.modalContainer}>
                <h1>{props.header}</h1>
                {props.body}
                <Button name={props.nameButton || "Применить"} onClick={props.onApply}/>
            </div>
            <div className={classes.backdrop} onClick={props.onAbort}/>
        </div>
    );
};

export default Modal;