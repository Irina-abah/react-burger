import React from 'react';
import MainStyles from "./App.module.css";
import Header from "../AppHeader/AppHeader";
import Main from "../Main/Main";
import ingredients from "../../utils/data";

function App() {
  return (
    <div className={MainStyles.App}>
      <Header />
      <Main data={ingredients}/>
    </div>
  )
}

export default App;
