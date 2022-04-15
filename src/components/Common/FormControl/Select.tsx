import {Field} from 'formik';
import React from 'react';
import styles from './Select.less';

interface PropsType {
    name: string;
    label: string;
}

const Select: React.FC<PropsType> = (props) => {
    return (
        <>
            <label className={styles.Label}>{props.label}</label>
            <Field as="select" name={props.name} className={styles.Select}>
                {props.children}
            </Field>
        </>
    );
};

export default Select;