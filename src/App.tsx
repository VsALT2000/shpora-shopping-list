import React, {useState} from 'react';
import {ShoppingList} from './components/ShoppingList/ShoppingList';
import classes from './App.less';
import {EditItemForm} from "./components/EdiItemForm/EditItemForm";
import {Routes, Route, useParams} from 'react-router-dom';

const Test = () => {
    return (
        <div>
            Nothing is here. Type on url /shpora-shopping-list/0
        </div>
    );
}

const ProductList = () => {
    const ShoppingListId = useParams().ShoppingListId;
    const [openedForm, setOpenedForm] = useState(false);
    return (
        <div>
            <ShoppingList onOpenForm={() => setOpenedForm(true)}/>
            {openedForm && <EditItemForm onCloseForm={() => setOpenedForm(false)}/>}
        </div>
    );
}

const App: React.FC = () => {

    return (
        <div className={classes.appWrapper}>
            <div className={classes.appContainer}>
                <Routes>
                    <Route path={"/"}>
                        <Route path={":ShoppingListId"} element={<ProductList/>}/>
                        <Route index element={<Test/>}/>
                    </Route>
                </Routes>
            </div>
        </div>
    );
}

export default App;