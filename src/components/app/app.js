import React from 'react';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import Header from "../app-header/app-header";
import Main from "../main/main";
import Login from '../../pages/login/login';
import Register from '../../pages/register/register';
import ForgotPassword from '../../pages/forgot-password/forgot-password';
import ResetPassword from '../../pages/reset-password/reset-password';
import Profile from '../../pages/profile/profile';
import Modal from '../modal/modal';
import IngredientsDetails from '../ingredient-details/ingredient-details';
import PageNotFound from '../../pages/not-found/not-found';
import { ProtectedRoute } from '../../pages/protected-route';
import { useDispatch } from 'react-redux';
import { getIngredients } from '../../services/actions/ingredients';

function App() {

  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  let background = location.state && location.state.background;

  const handleModalClose = () => {
    history.goBack(); // версия для 5 роутера
  };

  React.useEffect(() => {
    dispatch(getIngredients())
  }, [dispatch])

  return (
    <div>
      <Header />
        <Switch location={background || location}>
          <Route path="/login">
            <Login/>
          </Route>
          <Route path="/register">
            <Register/>
          </Route>
          <Route path="/forgot-password">
            <ForgotPassword/>
          </Route>
          <Route path="/reset-password">
            <ResetPassword/>
          </Route>
          <ProtectedRoute path="/profile">
            <Profile/>
          </ProtectedRoute>
          <Route path="/ingredients/:ingredientId">
            <IngredientsDetails />
          </Route>
          <Route exact path="/">
            <Main />
          </Route>
          <Route path="*">
            <PageNotFound />
          </Route>
        </Switch>
        {background && (
        <Route 
          path="/ingredients/:ingredientId"
          children={
            <Modal
              title="Детали ингредиента" 
              onClose={handleModalClose}
            >
            <IngredientsDetails/>
          </Modal>
          }
        />
      )}
    </div>
  )
}

export default App;
