import React from "react";
import MainStyles from "../Main/Main.module.css";
import BurgerConstructor from "./BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "./BurgerIngredients/BurgerIngredients";

function Main() {
  return (
    <section className={`${MainStyles.main} pl-5 pr-5 pb-10 pt-10`}>
      <BurgerIngredients />
      <BurgerConstructor />
    </section>
  )
}

export default Main;