import { useState, useCallback, ChangeEvent, FunctionComponent } from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from '../../utils/hooks';
import { loginUser } from '../../services/actions/login';
import { TUser, TLocationState } from '../../utils/types';
import UserForm from '../user-form/user-form';
import loginStyles from './login.module.css';
import PasswordInput from '../../ui-elements/password-input';
import EmailInput from '../../ui-elements/email-input';

const Login: FunctionComponent = () => {

  const dispatch = useDispatch();
  const location = useLocation();
  const { state } = location as TLocationState;
  const isLoggedIn = useSelector(store => store.login.isLoggedIn);
  const auth = useSelector((store) => store.getUser.isAuthenticated);
  const [form, setForm] = useState<TUser>({} as TUser);
  // const [form, setForm] = useState({ 
  //   email: '', 
  //   password: '' 
  // });

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
  
    if (isLoggedIn || auth) {
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
            name='email'
            label='Email'
            onChange={handleInputChange} 
            value={form.email} 
          />
        </div> 
        <div className={`mb-6`}>
          <PasswordInput 
            name='password'
            label='Password' 
            value={form.password} 
            onChange={handleInputChange} 
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