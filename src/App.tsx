import React, {useState} from 'react';
import {ShoppingList} from './components/ShoppingList/ShoppingList';
import classes from './App.less';
import {EditItemForm} from "./components/EdiItemForm/EditItemForm";

const App: React.FC = () => {
    const [openedForm, setOpenedForm] = useState(false);

    return (
        <div className={classes.appWrapper}>
            <div className={classes.appContainer}>
                <ShoppingList onOpenForm={() => setOpenedForm(true)}/>
                {openedForm && <EditItemForm onCloseForm={() => setOpenedForm(false)}/>}
            </div>
        </div>
    );
}

export default App;