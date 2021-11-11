import React from 'react';
import logo from '../../logo.svg';
import MainStyles from './App.module.css';
import Header from '../AppHeader/AppHeader';
import Main from '../Main/Main';

function App() {
  return (
    <div className={MainStyles.App}>
      <Header />
      <Main />
    </div>
  );
}

export default App;
