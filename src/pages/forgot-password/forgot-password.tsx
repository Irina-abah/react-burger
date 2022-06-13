import { useState, useCallback, ChangeEvent, FunctionComponent } from 'react';
import { Redirect } from 'react-router-dom';
import { forgotPass } from '../../services/actions/forgot-pass';
import { useSelector, useDispatch } from '../../utils/hooks';
import UserForm from '../user-form/user-form';
import forgotStyles from './forgot-password.module.css';
import EmailInput from '../../ui-elements/email-input';

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
          <EmailInput
            name={'email'}
            label={'Укажите e-mail'}
            value={email}
            onChange={handleInputChange}
          />
        </div> 
      </UserForm>
    </section>
  )
}

export default ForgotPassword;