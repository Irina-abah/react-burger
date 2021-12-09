import React from "react";
import mainStyles from "./main.module.css";
import BurgerConstructor from "../burder-constructor/burder-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import PropTypes from "prop-types";

function Main({isFailed}) {
  
  return (
    <section className={`${mainStyles.main} pl-5 pr-5 pb-10 pt-10`}>
      <BurgerIngredients isFailed={isFailed}/>
      <BurgerConstructor />
    </section>
  )
}

Main.propTypes = {
  isFailed: PropTypes.bool.isRequired
}

export default Main;