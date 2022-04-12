import {useField} from "formik";
import classes from './Input.less';
import React from "react";

interface PropsType {
    name: string;
    label: string;
    type: "text" | "number";
    placeholder?: string;
    min?: number;
    step?: number;
}

const Input: React.FC<PropsType> = ({...props}) => {
    const [field, meta] = useField(props);

    return (
        <>
            <label className={classes.Label}>{props.label}</label>
            <input className={`${classes.Input} ${
                meta.touched && meta.error && classes.error
            }`} {...field} {...props}/>
            {meta.touched && meta.error ? (
                <div className={classes.ErrorMessage}>
                    {meta.error}
                </div>
            ) : null}
        </>
    );
};

export default Input;