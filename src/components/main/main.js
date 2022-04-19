import React from "react";
import mainStyles from "./main.module.css";
import BurgerConstructor from "../burder-constructor/burder-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import PropTypes from "prop-types";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function Main({isFailed}) {
  
  return (
    <section className={`${mainStyles.main} pl-5 pr-5 pb-10 pt-10`}>
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients isFailed={isFailed}/>
        <BurgerConstructor />
      </DndProvider>
    </section>
  )
}

Main.propTypes = {
  isFailed: PropTypes.bool.isRequired
}

export default Main;