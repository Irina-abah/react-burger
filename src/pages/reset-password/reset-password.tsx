import { useState, useCallback, ChangeEvent, FunctionComponent } from 'react';
import { Redirect } from 'react-router-dom';
import { resetPass } from '../../services/actions/reset-pass';
import { useSelector, useDispatch } from '../../utils/hooks';
import { TUserReset } from '../../utils/types';
import UserForm from '../user-form/user-form';
import resetStyles from './reset-password.module.css';
import Input from '../../ui-elements/input';
import PasswordInput from '../../ui-elements/password-input';

const ResetPassword: FunctionComponent = () => {

  const dispatch = useDispatch();
  const passwordReset = useSelector((store) => store.reset.isPasswordReset);
  const [state, setState] = useState<TUserReset>({} as TUserReset);

  let submit = useCallback(
    e => {
      e.preventDefault()
      dispatch(resetPass(state))
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
            name={'password'}
            label={'Введите новый пароль'}
            value={state.password}
            onChange={handleInputChange}
          />
        </div>
        <div className={`mb-6`}>
          <Input
            name={'token'}
            label={'Введите код из письма'}
            onChange={handleInputChange}
            value={state.token}
          />
        </div> 
      </UserForm>
    </section>
  )
}

export default ResetPassword;