import { useState, useCallback, ChangeEvent, FunctionComponent } from 'react';
import { Redirect } from 'react-router-dom';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { forgotPass } from '../../services/actions/forgot-pass';
import { useSelector, useDispatch } from '../../utils/hooks';
import UserForm from '../user-form/user-form';
import forgotStyles from './forgot-password.module.css';

const ForgotPassword: FunctionComponent = () => {

  const [email, setEmail] = useState<string>("")
  const dispatch = useDispatch();
  const emailSent = useSelector((state) => state.forgot.isEmailSent)

  let submit = useCallback(
    e => {
      e.preventDefault()
      dispatch(forgotPass(email))
    },
    [dispatch, email]
  )

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

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
            // required={true}
          />
        </div> 
      </UserForm>
    </section>
  )
}

export default ForgotPassword;