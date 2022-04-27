import { useState } from 'react';
import UserForm from '../user-form/user-form';
import resetStyles from "./reset-password.module.css";
import { Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';

function ResetPassword() {

  const [state, setState] = useState({
    password: "",
    code: ""
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
    <section className={resetStyles.reset}>
      <UserForm
        title="Восстановление пароля"
        onSubmit={handleSubmit}
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
            value={state.code}
            name={'code'}
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