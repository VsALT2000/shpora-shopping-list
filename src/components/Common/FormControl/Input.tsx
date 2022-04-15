import {useField} from "formik";
import styles from './Input.less';
import React from "react";
import cn from "classnames";

interface Props {
    name: string;
    label: string;
    type: "text" | "number";
    placeholder?: string;
    min?: number;
    step?: number;
}

const Input: React.FC<Props> = (props) => {
    const [field, meta] = useField(props);

    return (
        <>
            <label className={styles.Label}>{props.label}</label>
            <input className={cn(styles.Input, {
                [styles.error]: meta.touched && meta.error
            })} {...field} {...props}/>
            {meta.touched && meta.error ? (
                <div className={styles.ErrorMessage}>
                    {meta.error}
                </div>
            ) : null}
        </>
    );
};

export default Input;