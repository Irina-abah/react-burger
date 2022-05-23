import { useState, useCallback, ChangeEvent, FunctionComponent } from 'react';
import UserForm from "../user-form/user-form";
import loginStyles from "./login.module.css";
import { Link, Redirect, useLocation } from "react-router-dom";
import { PasswordInput, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser } from "../../services/actions/login";
import { TUserLogin } from "../../utils/types";
import { Location } from "history";

type LocationState = {
  state: {
    background: Location,
    from: string
  }
}; 

const Login: FunctionComponent = () => {

  const dispatch = useDispatch();
  const location = useLocation();
  const { state } = location as LocationState;
  const auth = useSelector((store: any) => store.login.isAuthenticated);
  const [form, setForm] = useState<TUserLogin>({} as TUserLogin);


  let submit = useCallback(
    e => {
      e.preventDefault()
      dispatch(loginUser(form))
    },
    [dispatch, form]
  )
  
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      const name = e.target.name;
  
      setForm({
        ...form,
        [name]: value
      })
    }
  
    if (auth) {
      return (
        <Redirect
          to={ state?.from || '/' }
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
            value={form.email} 
            name={'email'}
          />
        </div> 
        <div className={`mb-6`}>
          <PasswordInput 
            onChange={handleInputChange} 
            value={form.password} 
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