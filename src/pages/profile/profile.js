import { useState } from 'react';
import profileStyles from "./profile.module.css";
import { Link, NavLink } from "react-router-dom";
import { Input, PasswordInput, EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../services/actions/logout';

function Profile() {

  const dispatch = useDispatch();

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

  const onSignOut = () => {
    dispatch(logoutUser(state))
  }

  return (
    <section className={profileStyles.profile}>
      <nav>
        <ul className={profileStyles.nav}>
          <li className={profileStyles.nav_item}>
            <NavLink 
              to={{pathname: "/profile" }}
              className={`${profileStyles.nav_link} text_type_main-medium text_color_inactive pl-5 pr-5 mr-2`} 
              activeClassName={profileStyles.active}>Профиль
            </NavLink>
          </li>
          <li className={profileStyles.nav_item}>
            <NavLink 
              to={{pathname: "/profile/orders" }}
              className={`${profileStyles.nav_link} text_type_main-medium text_color_inactive pl-5 pr-5 mr-2`} 
              activeClassName={profileStyles.active}>История заказов
            </NavLink>
          </li>
          <li className={profileStyles.nav_item}>
            <Link 
              to={{pathname: "/" }}
              className={`${profileStyles.nav_link} text_type_main-medium text_color_inactive pl-5 pr-5 mr-2`} 
              activeClassName={profileStyles.active}
              onClick={onSignOut}>Выход
            </Link>
          </li>
        </ul>
      </nav>
      
      <div className={profileStyles.inputs}>
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
      </div>
      <p className={`${profileStyles.text} text_type_main-default text_color_inactive`} >
        В этом разделе вы можете изменить свои персональные данные
      </p>
      <div className={profileStyles.buttons}>
        <Button type="secondary" size="medium">
          Отмена
        </Button>
        <Button type="primary" size="medium">
          Сохранить
        </Button>
      </div>
    </section>
  )
}

export default Profile;