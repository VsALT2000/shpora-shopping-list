import React from 'react';
import styles from './Checkbox.less';
import cn from "classnames";

const Checkbox: React.FC<React.HTMLProps<HTMLInputElement>> = (props) => {
    return (
        <input {...props} className={cn(styles.Checkbox, {[props.className as string]: Boolean(props.className)})} type="checkbox"/>
    );
};

export default Checkbox;
