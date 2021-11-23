import MainStyles from "../Main/Main.module.css";
import BurgerConstructor from "./BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "./BurgerIngredients/BurgerIngredients";

function Main({data}) {
  return (
    <section className={`${MainStyles.main} pl-5 pr-5 pb-10 pt-10`}>
      <BurgerIngredients data={data}/>
      <BurgerConstructor data={data}/>
    </section>
  )
}

export default Main;