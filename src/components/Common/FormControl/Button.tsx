import React from 'react'
import styles from './Button.less'

export const Button: React.FC<React.HTMLProps<HTMLButtonElement>> = (props) => {
    return (
        <button className={styles.button} {...props} type='submit'>
            {props.children}
        </button>
    )
}
