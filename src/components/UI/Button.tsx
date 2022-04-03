import styles from './Button.module.css'

type buttonProps = {
    name: string;
    onClick?: any;
}

export const Button: React.FC<buttonProps> = (props) => {
    const buttonClickHandler = () => {
        if(props.onClick){
            props.onClick()
        }
    }
    return (
        <button type='submit' className={styles.button} onClick={buttonClickHandler}>{props.name}</button>
    )
}