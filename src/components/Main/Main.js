import MainStyles from "../Main/Main.module.css";
import BurgerConstructor from "./BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "./BurgerIngredients/BurgerIngredients";
import ingredientType from "../../utils/types";
import PropTypes from "prop-types";

function Main({data}) {
  return (
    <section className={`${MainStyles.main} pl-5 pr-5 pb-10 pt-10`}>
      <BurgerIngredients data={data}/>
      <BurgerConstructor data={data}/>
    </section>
  )
}

Main.propTypes = {
  data: PropTypes.arrayOf(ingredientType).isRequired
}

export default Main;