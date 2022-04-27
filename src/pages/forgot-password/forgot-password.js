import { useState } from 'react';
import UserForm from '../user-form/user-form';
import forgotStyles from "./forgot-password.module.css";
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';

function ForgotPassword() {

  const [email, setEmail] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault()
  }
  
  const handleInputChange = (e) => {
    setEmail(e.target.value)
    }

  return (
    <section className={forgotStyles.forgot}>
      <UserForm
        title="Восстановление пароля"
        onSubmit={handleSubmit}
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