import React from 'react';
import { Route, Switch } from "react-router-dom";
import MainStyles from './App.module.css';
import Header from '../AppHeader/AppHeader';
import Main from '../Main/Main';

class App extends React.Component {
  render() {
    return (
      <div className={MainStyles.App}>
        <Switch>
          <Route exact path="/constructor">
            <Header />
            <Main />
          </Route>
        </Switch>
        
      </div>
    )
  }
  
}

export default App;
