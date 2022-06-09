import { FunctionComponent } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useDispatch } from '../../utils/hooks';
import { logoutUser } from '../../services/actions/logout';
import profileMenuStyles from './profile-menu.module.css';

const ProfileMenu: FunctionComponent = () => {

  const dispatch = useDispatch();

  const onSignOut = () => {
    dispatch(logoutUser())
  }

  return (
    <nav className={`mt-20`}>
      <ul className={profileMenuStyles.nav}>
        <li>
          <NavLink 
            to={{pathname: "/profile" }}
            exact
            className={`${profileMenuStyles.nav_item} text_type_main-medium text_color_inactive pl-5 pr-5 mr-2`} 
            activeClassName={profileMenuStyles.active}>Профиль
          </NavLink>
        </li>
        <li>
          <NavLink 
            to={{pathname: "/profile/orders" }}
            exact 
            className={`${profileMenuStyles.nav_item} text_type_main-medium text_color_inactive pl-5 pr-5 mr-2`} 
            activeClassName={profileMenuStyles.active}>История заказов
          </NavLink>
        </li>
        <li>
          <Link 
            to={{pathname: "/login" }}
            className={`${profileMenuStyles.nav_item} text_type_main-medium text_color_inactive pl-5 pr-5 mr-2`} 
            onClick={onSignOut}>Выход
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default ProfileMenu;