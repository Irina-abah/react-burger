import { useState } from 'react';
import profileStyles from "./profile.module.css";
import { Link, NavLink } from "react-router-dom";
import { Input, PasswordInput, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';

function Profile() {

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
    <section className={profileStyles.profile}>
      <nav>
        <ul>
          <li>
          <NavLink 
            to="/profile" 
            className={`${profileStyles.nav_item} text_type_main-medium text_color_inactive pl-5 pr-5 mr-2`} 
            activeClassName={profileStyles.active}>Профиль
          </NavLink>
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
    </section>
  )
}

export default Profile;