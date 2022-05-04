import { useState, useEffect, useCallback } from 'react';
import UserForm from '../user-form/user-form';
import forgotStyles from "./forgot-password.module.css";
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { forgotPass } from '../../services/actions/forgot-pass';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Redirect } from 'react-router-dom';

function ForgotPassword() {

  const [email, setEmail] = useState("")
  const history = useHistory();
  const dispatch = useDispatch();
  const emailSent = useSelector((store) => store.forgot.isEmailSent)

  let submit = useCallback(
    e => {
      e.preventDefault()
      dispatch(forgotPass(email))
    },
    [dispatch, email]
  )

  const handleInputChange = (e) => {
    setEmail(e.target.value)
  }

  useEffect(() => {
    if (emailSent) {
      history.replace({ pathname: '/reset-password' });
    }
  }, [history, emailSent]);

  if (emailSent) {
    return (
      <Redirect
        to={{
          pathname: '/reset-password'
        }}
      />
    );
  }  

  return (
    <section className={forgotStyles.forgot}>
      <UserForm
        title="Восстановление пароля"
        onSubmit={submit}
        buttonName="Восстановить"
        message="Вспомнили пароль? " 
        link="/login" 
        linkName="Войти"
      >
        <div className={`mb-6`}>
          <Input
            type={'email'}
            placeholder={'Укажите e-mail'}
            onChange={handleInputChange}
            value={email}
            name={'email'}
            error={false}
            size={'default'}
            required={true}
          />
        </div> 
      </UserForm>
    </section>
  )
}

export default ForgotPassword;