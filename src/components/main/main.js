import React from "react";
import mainStyles from "./main.module.css";
import BurgerConstructor from "../burder-constructor/burder-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import PropTypes from "prop-types";
import { BurgerContext } from "../../contexts/burger-context";

function Main({isFailed}) {

  const data = React.useContext(BurgerContext);
  
  return (
    <section className={`${mainStyles.main} pl-5 pr-5 pb-10 pt-10`}>
      <BurgerIngredients data={data} isFailed={isFailed}/>
      <BurgerConstructor data={data}/>
    </section>
  )
}

Main.propTypes = {
  isFailed: PropTypes.bool.isRequired
}

export default Main;