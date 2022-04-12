import {Field} from 'formik';
import React from 'react';
import classes from './Select.less';

interface PropsType {
    name: string;
    label: string;
}

const Select: React.FC<PropsType> = (props) => {
    return (
        <>
            <label className={classes.Label}>{props.label}</label>
            <Field as="select" name={props.name} className={classes.Select}>
                {props.children}
            </Field>
        </>
    );
};

export default Select;