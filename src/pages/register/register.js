import { useEffect, useState, useCallback } from 'react';
import UserForm from '../user-form/user-form';
import registerStyles from "./register.module.css";
import { Input, PasswordInput, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from 'react-redux';
import { registerUser } from "../../services/actions/register";
import { Redirect, useHistory } from 'react-router-dom';

function Register() {

  const dispatch = useDispatch();
  const history = useHistory();
  const auth = useSelector((store) => store.register.isAuthenticated)
  const [state, setState] = useState({
    name: "",
    email: "",
    password: ""
  });

  let submit = useCallback(
    e => {
      e.preventDefault()
      dispatch(registerUser(state))
    },
    [dispatch, state]
  )
  
  const handleInputChange = (e) => {
      const value = e.target.value;
      const name = e.target.name;
  
      setState({
        ...state,
        [name]: value
      })
    }

    useEffect(() => {
      if (auth) {
        history.replace({ pathname: '/login' });
      }
    }, [history, auth]);
  
    if (auth) {
      return (
        <Redirect
          to={{
            pathname: '/login'
          }}
        />
      );
    }

  return (
    <section className={registerStyles.register}>
      <UserForm
        title="Регистрация"
        onSubmit={submit}
        buttonName="Зарегистрироваться"
        message="Уже зарегистрированы? " 
        link="/login" 
        linkName="Войти"
      >
        <div className={`mb-6`}>
          <Input 
            onChange={handleInputChange} 
            value={state.name} 
            name={'name'}
            placeholder={'Имя'}
          />
        </div>
        <div className={`mb-6`}>
          <EmailInput 
            onChange={handleInputChange} 
            value={state.email} 
            name={'email'}
          />
        </div> 
        <div className={`mb-6`}>
          <PasswordInput 
            onChange={handleInputChange} 
            value={state.password} 
            name={'password'}
          />
        </div>
      </UserForm>
    </section>
  )
}

export default Register;