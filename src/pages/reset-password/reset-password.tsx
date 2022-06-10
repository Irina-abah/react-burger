import { useState, useCallback, ChangeEvent, FunctionComponent } from 'react';
import { Redirect } from 'react-router-dom';
import { Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { resetPass } from '../../services/actions/reset-pass';
import { useSelector, useDispatch } from '../../utils/hooks';
import { TUserReset } from '../../utils/types';
import UserForm from '../user-form/user-form';
import resetStyles from './reset-password.module.css';

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
            // placeholder={'Введите новый пароль'}
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
            // required
          />
        </div> 
      </UserForm>
    </section>
  )
}

export default ResetPassword;