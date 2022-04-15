import React, {useState} from 'react';
import {ShoppingList} from './components/ShoppingList/ShoppingList';
import styles from './App.less';
import {EditItemForm} from "./components/EdiItemForm/EditItemForm";

const App: React.FC = () => {
    const [openedForm, setOpenedForm] = useState(false);

    return (
        <div className={styles.appWrapper}>
            <div className={styles.appContainer}>
                <ShoppingList onOpenForm={() => setOpenedForm(true)}/>
                {openedForm && <EditItemForm onCloseForm={() => setOpenedForm(false)}/>}
            </div>
        </div>
    );
}

export default App;