import { useEffect, useState, FormEvent, ChangeEvent } from 'react';
import profileStyles from "./profile.module.css";
import { Link, NavLink } from "react-router-dom";
import { Input, PasswordInput, EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from '../../utils/hooks';
import { logoutUser } from '../../services/actions/logout';
import { patchUser } from '../../services/actions/patch-user';
import { TUserMain } from '../../utils/types';

function Profile() {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.getUser.user);
  const isSuccess = useSelector((state) => state.patchUser.isSuccess);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [state, setState] = useState<TUserMain>({} as TUserMain);

  useEffect(() => {
    setState(user)
  }, [])

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isEdit) {
      dispatch(patchUser(state))
    }
  }
  
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      const name = e.target.name;
  
      setState({
        ...state,
        [name]: value
      })
      setIsEdit(true)
    }

  const onReset = (e: FormEvent) => {
    e.preventDefault()
    setState({
      ...state,
      name: user.name,
      email: user.email,
      password: ""
    })
  }
  
  const onSignOut = () => {
    dispatch(logoutUser())
  }

  return (
    <section className={profileStyles.profile}>
      <nav>
        <ul className={profileStyles.nav}>
          <li>
            <NavLink 
              to={{pathname: "/profile" }}
              exact
              className={`${profileStyles.nav_item} text_type_main-medium text_color_inactive pl-5 pr-5 mr-2`} 
              activeClassName={profileStyles.active}>Профиль
            </NavLink>
          </li>
          <li>
            <NavLink 
              to={{pathname: "/profile/orders" }}
              exact 
              className={`${profileStyles.nav_item} text_type_main-medium text_color_inactive pl-5 pr-5 mr-2`} 
              activeClassName={profileStyles.active}>История заказов
            </NavLink>
          </li>
          <li>
            <Link 
              to={{pathname: "/login" }}
              className={`${profileStyles.nav_item} text_type_main-medium text_color_inactive pl-5 pr-5 mr-2`} 
              onClick={onSignOut}>Выход
            </Link>
          </li>
        </ul>
      </nav>
      
      <form className={profileStyles.inputs} onSubmit={onSubmit}>
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
            value={state.email | ""} 
            name={'email'}
          />
        </div> 
        <div className={`mb-6`}>
          <PasswordInput 
            onChange={handleInputChange} 
            value={state.password || ""} 
            name={'password'}
          />
        </div>
        {isSuccess && <p>Данные успешно обновлены</p>}
        <div className={isEdit ? profileStyles.buttons : profileStyles.invisible}>
          <Button type="secondary" size="medium" onClick={onReset}>
            Отмена
          </Button>
          <Button type="primary" size="medium">
            Сохранить
          </Button>
        </div>
      </form>
      <p className={`${profileStyles.text} text_type_main-default text_color_inactive`} >
        В этом разделе вы можете изменить свои персональные данные
      </p>
    </section>
  )
}

export default Profile;