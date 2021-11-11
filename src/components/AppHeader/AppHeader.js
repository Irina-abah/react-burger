import React from 'react';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';

class Header extends React.Component {
  render() {
    return (
      <header>
        <nav>
          <ul>
            <li>Конструктор</li>
            <li>Лента заказов</li>
          </ul>
        </nav>
          <Logo />
      </header>
    )
  }
}

export default Header;