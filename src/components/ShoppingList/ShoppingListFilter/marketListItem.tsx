type marketListItemProps = {
    name: string;
}

export const MarketListItem: React.FC<marketListItemProps> = (props) => {
    return (
        <div>
            <input type="checkbox"checked/>
            <label >{props.name}</label>
        </div>
    )
}