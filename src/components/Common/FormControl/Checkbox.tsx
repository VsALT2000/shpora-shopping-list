import React from 'react';
import styles from './Checkbox.less';

const Checkbox: React.FC<React.HTMLProps<HTMLInputElement>> = (props) => {
    return (
        <input className={styles.Checkbox} {...props} type="checkbox"/>
    );
};

export default Checkbox;
