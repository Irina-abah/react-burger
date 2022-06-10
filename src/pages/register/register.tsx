import { useState, useCallback, ChangeEvent, FunctionComponent } from 'react';
import { Input, PasswordInput, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from '../../utils/hooks';
import { registerUser } from '../../services/actions/register';
import { Redirect } from 'react-router-dom';
import { TUserMain } from '../../utils/types';
import UserForm from '../user-form/user-form';
import registerStyles from './register.module.css';

const Register: FunctionComponent = () => {

  const dispatch = useDispatch();
  const auth = useSelector((store) => store.register.isAuthenticated)
  const [state, setState] = useState<TUserMain>({} as TUserMain);

  let submit = useCallback(
    e => {
      e.preventDefault()
      dispatch(registerUser(state))
    },
    [dispatch, state]
  )
  
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      const name = e.target.name;
  
      setState({
        ...state,
        [name]: value
      })
    }
  
    if (auth) {
      return (
        <Redirect
          to={{
            pathname: '/'
          }}
        />
      );
    }

  return (
    <section className={registerStyles.register}>
      <UserForm
        title="Регистрация"
        onSubmit={submit}
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