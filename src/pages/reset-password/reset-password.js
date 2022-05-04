import { useState, useEffect, useCallback } from 'react';
import UserForm from '../user-form/user-form';
import resetStyles from "./reset-password.module.css";
import { Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { resetPass } from '../../services/actions/reset-pass';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Redirect } from 'react-router-dom';

function ResetPassword() {

  const history = useHistory();
  const dispatch = useDispatch();
  const passwordReset = useSelector((store) => store.reset.isPasswordReset);
  const [state, setState] = useState({
    password: "",
    token: ""
  });


  let submit = useCallback(
    e => {
      e.preventDefault()
      dispatch(resetPass(state))
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
      if (passwordReset) {
        history.replace({ pathname: '/login' });
      }
    }, [history, passwordReset]);
  
    if (passwordReset) {
      return (
        <Redirect
          to={{
            pathname: '/login'
          }}
        />
      );
    }  

  return (
    <section className={resetStyles.reset}>
      <UserForm
        title="Восстановление пароля"
        onSubmit={submit}
        buttonName="Сохранить"
        message="Вспомнили пароль? " 
        link="/login" 
        linkName="Войти"
      >
        <div className={`mb-6`}>
          <PasswordInput
            placeholder={'Введите новый пароль'}
            value={state.password}
            name={'password'}
            onChange={handleInputChange}
          />
        </div>
        <div className={`mb-6`}>
          <Input
            type={'text'}
            placeholder={'Введите код из письма'}
            onChange={handleInputChange}
            value={state.token}
            name={'token'}
            error={false}
            size={'default'}
            required={true}
          />
        </div> 
      </UserForm>
    </section>
  )
}

export default ResetPassword;