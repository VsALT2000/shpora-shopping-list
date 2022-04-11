import React from 'react'
import styles from './Button.less'

export const Button: React.FC<React.HTMLProps<HTMLButtonElement>> = (props) => {
    return (
        <button type='submit' className={styles.button} onClick={props.onClick}>{props.children}</button>
    )
}
