import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import Header from "../app-header/app-header";
import Main from "../main/main";
import Login from '../../pages/login/login';
import { useDispatch } from 'react-redux';
import { getIngredients } from '../../services/actions/ingredients';

function App() {

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getIngredients())
  }, [dispatch])

  return (
    <div>
      <Header />
        <Switch>
          <Route path="/login">
            <Login/>
          </Route>
          <Route exact path="/">
            <Main />
          </Route>
        </Switch>
    </div>
  )
}

export default App;
