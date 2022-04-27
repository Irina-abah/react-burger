import { useState } from 'react';
import UserForm from "../user-form/user-form";
import loginStyles from "./login.module.css";
import { Link } from "react-router-dom";
import { PasswordInput, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';

function Login() {

  const [state, setState] = useState({
    email: "",
    password: ""
  });


  const handleSubmit = (e) => {
    e.preventDefault()
  }
  
  const handleInputChange = (e) => {
      const value = e.target.value;
      const name = e.target.name;
  
      setState({
        ...state,
        [name]: value
      })
    }

  return (
    <section className={loginStyles.login}>
      <UserForm
        title="Вход"
        onSubmit={handleSubmit}
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
      <p className={`text text_type_main-default text_color_inactive`}>
        {"Забыли пароль? "}
        <Link to="/forgot-password" className={`text text_type_main-default`}>
        Восстановить пароль
        </Link>
      </p>
    </section>
  )
}

export default Login;