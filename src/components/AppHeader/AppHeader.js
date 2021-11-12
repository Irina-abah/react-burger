import React from 'react';
import { BurgerIcon, Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, NavLink } from 'react-router-dom';
import HeaderStyles from './AppHeader.module.css'

class Header extends React.Component {
  render() {
    return (
      <header className={HeaderStyles.header}>
        <nav>
          <ul className={HeaderStyles.nav}>
            <li> 
              <NavLink to="/constructor">
              <BurgerIcon type="primary" />
              <p>Конструктор</p>
            </NavLink></li>
            <li><NavLink to="/orders">
              <p>Лента заказов</p>
              </NavLink></li>
          </ul>
        </nav>
        <Link exact path="/">
          <Logo />
        </Link>
        <NavLink to="/account">
        <p>Личный кабинет</p>
        </NavLink>
      </header>
    )
  }
}

export default Header;