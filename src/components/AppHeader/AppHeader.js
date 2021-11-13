import React from 'react';
import { BurgerIcon, ListIcon, ProfileIcon, Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, NavLink } from 'react-router-dom';
import HeaderStyles from './AppHeader.module.css'

class Header extends React.Component {
  render() {
    return (
      <header className={`${HeaderStyles.header} text text_type_main-default pb-4 pt-4`}>
        <div className={HeaderStyles.wrapper}>
          <nav>
            <ul className={HeaderStyles.nav}>
              <li> 
                <NavLink to="/constructor" className={`${HeaderStyles.nav_item} pl-5 pr-5 mr-2`}>
                <BurgerIcon type="secondary"/>
                <p className="ml-2">Конструктор</p>
              </NavLink></li>
                <li><NavLink to="/orders" className={`${HeaderStyles.nav_item} pl-5 pr-5`}>
                <ListIcon type="secondary" />
                <p className="ml-2">Лента заказов</p>
                </NavLink></li>
            </ul>
          </nav>
          <Link exact path="/">
            <Logo />
          </Link>
          <NavLink to="/account" className={`${HeaderStyles.nav_item} pl-5 pr-5`}>
            <ProfileIcon type="secondary" />
            <p className="ml-2">Личный кабинет</p>
          </NavLink>
        </div>
        
      </header>
    )
  }
}

export default Header;