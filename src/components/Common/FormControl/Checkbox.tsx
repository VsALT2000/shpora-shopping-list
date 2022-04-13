import React from 'react';
import classes from './Checkbox.less';

const Checkbox: React.FC<React.HTMLProps<HTMLInputElement>> = (props) => {
    return (
        <input className={classes.Checkbox} {...props} type={"checkbox"}/>
    );
};

export default Checkbox;
