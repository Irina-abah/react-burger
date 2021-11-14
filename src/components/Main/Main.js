import React from "react";
import MainStyles from "../Main/Main.module.css";
import BurgerConstructor from "./BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "./BurgerIngredients/BurgerIngredients";

class Main extends React.Component {
  render() {
    return (
      <section className={MainStyles.main}>
        <BurgerConstructor />
        <BurgerIngredients />
      </section>
    )
  }
}

export default Main;