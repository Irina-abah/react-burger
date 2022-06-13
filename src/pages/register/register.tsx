import { useState, useCallback, ChangeEvent, FunctionComponent } from 'react';
import { useSelector, useDispatch } from '../../utils/hooks';
import { registerUser } from '../../services/actions/register';
import { Redirect } from 'react-router-dom';
import { TUserMain } from '../../utils/types';
import UserForm from '../user-form/user-form';
import registerStyles from './register.module.css';
import Input from '../../ui-elements/input';
import PasswordInput from '../../ui-elements/password-input';
import EmailInput from '../../ui-elements/email-input';

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
            name='name'
            label='Имя'
            value={state.name}
            onChange={handleInputChange}
          />
        </div>
        <div className={`mb-6`}>
          <EmailInput 
            name='email'
            label='Email'
            value={state.email}
            onChange={handleInputChange}
          />
        </div>
        <div className={`mb-6`}>
          <PasswordInput
            name='password'
            label='Password'
            value={state.password}
            onChange={handleInputChange}
          />
        </div>
      </UserForm>
    </section>
  )
}

export default Register;