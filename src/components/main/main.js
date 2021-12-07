import React from "react";
import mainStyles from "./main.module.css";
import BurgerConstructor from "../burder-constructor/burder-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import ingredientType from "../../utils/types";
import PropTypes from "prop-types";
import { BurgerContext } from "../../contexts/burger-context";

function Main({isFailed, setIsFailed}) {

  const data = React.useContext(BurgerContext);
  
  return (
    <section className={`${mainStyles.main} pl-5 pr-5 pb-10 pt-10`}>
      <BurgerIngredients data={data} isFailed={isFailed}/>
      <BurgerConstructor data={data} setIsFailed={setIsFailed}/>
    </section>
  )
}

Main.propTypes = {
  data: PropTypes.arrayOf(ingredientType).isRequired,
  isFailed: PropTypes.bool.isRequired
}

export default Main;