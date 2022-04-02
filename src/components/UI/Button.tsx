import styles from './Button.module.css'

type buttonProps = {
    name: string;
}

export const Button: React.FC<buttonProps> = (props) => {
    return (
        <button type='submit' className={styles.button}>{props.name}</button>
    )
}