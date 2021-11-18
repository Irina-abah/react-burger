import React from 'react';
import { Route, Switch } from "react-router-dom";
import MainStyles from "./App.module.css";
import Header from "../AppHeader/AppHeader";
import Main from "../Main/Main";
import ingredients from "../../utils/data";

function App() {
  return (
    <div className={MainStyles.App}>
      <Switch>
        <Route exact path="/constructor">
          <Header />
          <Main data={ingredients}/>
        </Route>
      </Switch>
      
    </div>
  )
}

export default App;
