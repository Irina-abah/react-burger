import mainStyles from "./main.module.css";
import BurgerConstructor from "../burder-constructor/burder-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import ingredientType from "../../utils/types";
import PropTypes from "prop-types";

function Main({data}) {
  return (
    <section className={`${mainStyles.main} pl-5 pr-5 pb-10 pt-10`}>
      <BurgerIngredients data={data}/>
      <BurgerConstructor data={data}/>
    </section>
  )
}

Main.propTypes = {
  data: PropTypes.arrayOf(ingredientType).isRequired
}

export default Main;