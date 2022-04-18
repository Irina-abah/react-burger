import React from "react";
import { HashLink as Link } from "react-router-hash-link";
import ingredientsStyles from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import Ingredient from "../ingredient/ingredient";
import { LOAD_ERROR } from "../../utils/constants";
import PropTypes from "prop-types";
import { useSelector } from 'react-redux';
function BurgerIngredients({isFailed}) {

  // const data = React.useContext(BurgerContext);
  const data = useSelector((store) => store.ingredients.foodData);

  const [current, setCurrent] = React.useState('one');
  const buns = data.filter((item) => item.type === 'bun');
  const sauses = data.filter((item) => item.type === 'sauce');
  const mains = data.filter((item) => item.type === 'main');

  return (
    <div className={`mr-10`}>
      <h1 className={`text text_type_main-large mb-5`}>Соберите бургер</h1>
      <div style={{ display: 'flex' }}>
        <Tab value="one" active={current === 'one'} onClick={setCurrent}><Link className={ingredientsStyles.tab} to="#buns">Булки</Link>
        </Tab>
        <Tab value="two" active={current === 'two'} onClick={setCurrent}><Link className={ingredientsStyles.tab} to="#sauses">Соусы</Link>
        </Tab>
        <Tab value="three" active={current === 'three'} onClick={setCurrent}><Link className={ingredientsStyles.tab} to="#mains">Начинки</Link>
        </Tab>
      </div>
      {isFailed ? <p className={`${ingredientsStyles.error} text text_type_main-medium pt-15`}>{LOAD_ERROR}</p> : (<div className={ingredientsStyles.menu}>
        <div className={`mt-10`}>
          <h2 className={`${ingredientsStyles.title} text text_type_main-medium`} id="buns">Булки</h2>
          <div className={`${ingredientsStyles.type} mr-2 ml-4 mt-6`}>
            {buns.map((item, i) => (
              <Ingredient item={item} key={item._id}
              />
            ))}
          </div>
        </div>
        <div className={`mt-10`}>
          <h2 className={`${ingredientsStyles.title} text text_type_main-medium`} id="sauses">Соусы</h2>
          <div className={`${ingredientsStyles.type} mr-2 ml-4 mt-6`}>
            {sauses.map((item, i) => (
              <Ingredient item={item} key={item._id}
              />
            ))}
          </div>
        </div>
        <div className={`mt-10`}>
          <h2 className={`${ingredientsStyles.title} text text_type_main-medium`} id="mains">Начинки</h2>
          <div className={`${ingredientsStyles.type} mr-2 ml-4 mt-6`}>
            {mains.map((item, i) => (
              <Ingredient item={item} key={item._id}
              />
            ))}
          </div>
        </div>
      </div>)}
      
    </div>
  )
}

BurgerIngredients.propTypes = {
  isFailed: PropTypes.bool.isRequired
}

export default BurgerIngredients;