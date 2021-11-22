import React from "react";
import { HashLink as Link } from "react-router-hash-link";
import IngredientsStyles from "../BurgerIngredients/BurgerIngredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import Ingredient from "../Ingredient/Ingredient";
import ingredientType from "../../../utils/types";
import PropTypes from "prop-types";
function BurgerIngredients({data}) {

  const [current, setCurrent] = React.useState('one');
  const buns = data.filter((item) => item.type === 'bun');
  const sauses = data.filter((item) => item.type === 'sauce');
  const mains = data.filter((item) => item.type === 'main');

  return (
    <div className={`mr-10`}>
      <h1 className={`text text_type_main-large mb-5`}>Соберите бургер</h1>
      <div style={{ display: 'flex' }}>
        <Tab value="one" active={current === 'one'} onClick={setCurrent}><Link className={IngredientsStyles.tab} to="#buns">Булки</Link>
        </Tab>
        <Tab value="two" active={current === 'two'} onClick={setCurrent}><Link className={IngredientsStyles.tab} to="#sauses">Соусы</Link>
        </Tab>
        <Tab value="three" active={current === 'three'} onClick={setCurrent}><Link className={IngredientsStyles.tab} to="#mains">Начинки</Link>
        </Tab>
      </div>
      <div className={IngredientsStyles.menu}>
        <div className={`mt-10`}>
          <h2 className={`${IngredientsStyles.title} text text_type_main-medium`} id="buns">Булки</h2>
          <div className={`${IngredientsStyles.type} mr-2 ml-4 mt-6`}>
            {buns.map((item, i) => (
              <Ingredient item={item} key={item._id}
              />
            ))}
          </div>
        </div>
        <div className={`mt-10`}>
          <h2 className={`${IngredientsStyles.title} text text_type_main-medium`} id="sauses">Соусы</h2>
          <div className={`${IngredientsStyles.type} mr-2 ml-4 mt-6`}>
            {sauses.map((item, i) => (
              <Ingredient item={item} key={item._id}
              />
            ))}
          </div>
        </div>
        <div className={`mt-10`}>
          <h2 className={`${IngredientsStyles.title} text text_type_main-medium`} id="mains">Начинки</h2>
          <div className={`${IngredientsStyles.type} mr-2 ml-4 mt-6`}>
            {mains.map((item, i) => (
              <Ingredient item={item} key={item._id}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(ingredientType).isRequired
}

export default BurgerIngredients;