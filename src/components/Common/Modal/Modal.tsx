import React, {ReactElement} from 'react';
import {Button} from "../../UI/Button";
import classes from './Modal.less';

interface PropsTypes {
    header: string
    body: ReactElement[]
    onApply: () => void
}

const Modal: React.FC<PropsTypes> = (props) => {
    return (
        <div className={classes.modalWrapper}>
            <div className={classes.modalContainer}>
                <h1>{props.header}</h1>
                {props.body}
                <Button name="Применить" onClick={props.onApply}/>
            </div>
        </div>
    );
};

export default Modal;