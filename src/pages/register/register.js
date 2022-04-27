import { useState } from 'react';
import UserForm from '../user-form/user-form';
import registerStyles from "./register.module.css";
import { Input, PasswordInput, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';

function Register() {

  const [state, setState] = useState({
    name: "",
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
    <section className={registerStyles.register}>
      <UserForm
        title="Регистрация"
        onSubmit={handleSubmit}
        buttonName="Зарегистрироваться"
        message="Уже зарегистрированы? " 
        link="/login" 
        linkName="Войти"
      >
        <div className={`mb-6`}>
          <Input 
            onChange={handleInputChange} 
            value={state.name} 
            name={'name'}
            placeholder={'Имя'}
          />
        </div>
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
    </section>
  )
}

export default Register;