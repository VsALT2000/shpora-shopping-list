import React, { useState } from 'react';
import { ShoppingList } from './components/ShoppingList/ShoppingList';
import './App.module.css';
import './common.css';
import { EditItemForm } from "./components/EdiItemForm/EditItemForm";



const App: React.FC = () => {
  const [openedForm, setOpenedForm] = useState(false);

  return (
    <div>
      <ShoppingList onOpenForm={() => {setOpenedForm(true)}}/>
      {openedForm && <EditItemForm onCloseForm={() => {setOpenedForm(false)}} />}
    </div>
   );  
}

export default App;