import { FunctionComponent } from "react";
import { BurgerIcon, ListIcon, ProfileIcon, Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, NavLink } from "react-router-dom";
import headerStyles from "./app-header.module.css";

const Header: FunctionComponent = () => {
  return (
    <header className={`${headerStyles.header} text text_type_main-default pb-4 pt-4`}>
      <div className={headerStyles.wrapper}>
        <nav>
          <ul className={headerStyles.nav}>
            <li> 
              <NavLink 
                to="/constructor" 
                className={`${headerStyles.nav_item} text_color_inactive pl-5 pr-5 mr-2`} 
                activeClassName={headerStyles.active}>
              <BurgerIcon type="secondary"/>
              <p className={`${headerStyles.text} ml-2`}>Конструктор</p>
            </NavLink></li>
              <li>
                <NavLink 
                to="/orders" 
                className={`${headerStyles.nav_item} text_color_inactive pl-5 pr-5`}
                activeClassName={headerStyles.active}>
              <ListIcon type="secondary" />
              <p className={`${headerStyles.text} ml-2`}>Лента заказов</p>
              </NavLink></li>
          </ul>
        </nav>
        <Link to="/" className={headerStyles.logo}>
          <Logo />
        </Link>
        <NavLink 
          to="/profile" 
          className={`${headerStyles.nav_item} text_color_inactive pl-5 pr-5`}
          activeClassName={headerStyles.active}>
          <ProfileIcon type="secondary" />
          <p className={`${headerStyles.text} ml-2`}>Личный кабинет</p>
        </NavLink>
      </div>  
    </header>
  )
}

export default Header;