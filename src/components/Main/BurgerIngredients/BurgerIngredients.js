import React from "react";
import Ingredients from "../BurgerIngredients/BurgerIngredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

function BurgerIngredients() {

  const [current, setCurrent] = React.useState('one');

  return (
    <div>
      <h1 className={`text text_type_main-large mb-5`}>Соберите бургер</h1>
      <nav>
        <div style={{ display: 'flex' }}>
          <Tab value="one" active={current === 'one'} onClick={setCurrent}>
          Булки
          </Tab>
          <Tab value="two" active={current === 'two'} onClick={setCurrent}>
          Соусы
          </Tab>
          <Tab value="three" active={current === 'three'} onClick={setCurrent}>
          Начинки
          </Tab>
        </div>
      </nav>

    </div>
  )
}

BurgerIngredients.propTypes = {
  current: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    proteins: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
  })
}

export default BurgerIngredients;