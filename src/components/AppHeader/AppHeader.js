import React from "react";
import { BurgerIcon, ListIcon, ProfileIcon, Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, NavLink } from "react-router-dom";
import HeaderStyles from "./AppHeader.module.css";

function Header() {
  return (
    <header className={`${HeaderStyles.header} text text_type_main-default pb-4 pt-4`}>
      <div className={HeaderStyles.wrapper}>
        <nav>
          <ul className={HeaderStyles.nav}>
            <li> 
              <NavLink 
                to="/constructor" 
                className={`${HeaderStyles.nav_item} pl-5 pr-5 mr-2`} 
                activeClassName={HeaderStyles.active}>
              <BurgerIcon type="secondary"/>
              <p className={`${HeaderStyles.text} ml-2`}>Конструктор</p>
            </NavLink></li>
              <li>
                <NavLink 
                to="/orders" 
                className={`${HeaderStyles.nav_item} pl-5 pr-5`}
                activeClassName={HeaderStyles.active}>
              <ListIcon type="secondary" />
              <p className={`${HeaderStyles.text} ml-2`}>Лента заказов</p>
              </NavLink></li>
          </ul>
        </nav>
        <Link to="/">
          <Logo />
        </Link>
        <NavLink 
          to="/account" 
          className={`${HeaderStyles.nav_item} pl-5 pr-5`}
          activeClassName={HeaderStyles.active}>
          <ProfileIcon type="secondary" />
          <p className={`${HeaderStyles.text} ml-2`}>Личный кабинет</p>
        </NavLink>
      </div>
      
    </header>
  )
}

export default Header;