import { useState, useCallback } from 'react';
import UserForm from "../user-form/user-form";
import loginStyles from "./login.module.css";
import { Link, Redirect, useLocation } from "react-router-dom";
import { PasswordInput, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser } from "../../services/actions/login";

function Login() {

  const dispatch = useDispatch();
  const location = useLocation()
  const auth = useSelector((store) => store.login.isAuthenticated);
  const [state, setState] = useState({
    email: "",
    password: ""
  });


  let submit = useCallback(
    e => {
      e.preventDefault()
      dispatch(loginUser(state))
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
  
    if (auth) {
      return (
        <Redirect
          to={ location?.state?.from || '/' }
        />
      );
    }

  return (
    <section className={loginStyles.login}>
      <UserForm
        title="Вход"
        onSubmit={submit}
        buttonName="Войти"
        message="Вы — новый пользователь? " 
        link="/register" 
        linkName="Зарегистрироваться"
      >
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
      <p className={`text text_type_main-default text_color_inactive mt-4`}>
        {"Забыли пароль? "}
        <Link to="/forgot-password" className={`text text_type_main-default`}>
        Восстановить пароль
        </Link>
      </p>
    </section>
  )
}

export default Login;