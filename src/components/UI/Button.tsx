import React from 'react'
import styles from './Button.less'



export const Button: React.FC<React.HTMLProps<HTMLButtonElement>> = (props) => {
    const buttonClickHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if(props.onClick){
            props.onClick(event)
        }
    }
    return (
        <button type='submit' className={styles.button} onClick={buttonClickHandler}>{props.name}</button>
    )
}