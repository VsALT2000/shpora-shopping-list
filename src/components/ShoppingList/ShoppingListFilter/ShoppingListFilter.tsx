import { MarketListItem } from "./marketListItem"
import { Button } from "../../UI/Button"
import styles from './ShoppingListFilter.module.css'

export const ShoppingListFilter: React.FC = () => {
    const marketList = ['Пятерочка', 'Монетка', 'Верный', 'Перекресток']
    return (
        <div className={styles.shoppingListFilter}>
            <h1>Фильтр</h1>
            {marketList.map((name) => <MarketListItem name={name}/>)}
            <Button name='Применить'/>
        </div>
    )
}