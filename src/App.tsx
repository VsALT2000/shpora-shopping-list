import React from 'react';
import classes from './App.less';
import {Routes, Route} from 'react-router-dom';
import ListShoppingLists from "./components/ListShoppingLists/ListShoppingLists";
import ShoppingList from "./components/ShoppingList/ShoppingList";


const App: React.FC = () => {
    return (
        <div className={classes.appWrapper}>
            <div className={classes.appContainer}>
                <Routes>
                    <Route path={"/"}>
                        <Route path={":ShoppingListId"} element={<ShoppingList/>}/>
                        <Route index element={<ListShoppingLists/>}/>
                    </Route>
                </Routes>
            </div>
        </div>
    );
}

export default App;