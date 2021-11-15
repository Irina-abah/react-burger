import React from "react";
import { HashLink as Link } from "react-router-hash-link";
import Ingredients from "../BurgerIngredients/BurgerIngredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import Ingredient from "../Ingredient/Ingredient";
import data from "../../../utils/data"
import PropTypes from "prop-types";

function BurgerIngredients() {

  const [current, setCurrent] = React.useState('one');
  const buns = data.filter((item) => item.type === 'bun');
  const sauses = data.filter((item) => item.type === 'sauce');
  const mains = data.filter((item) => item.type === 'main');

  return (
    <div>
      <h1 className={`text text_type_main-large mb-5`}>Соберите бургер</h1>
      <div style={{ display: 'flex' }}>
        <Tab value="one" active={current === 'one'} onClick={setCurrent}><Link className={Ingredients.tab} to="#buns">Булки</Link>
        </Tab>
        <Tab value="two" active={current === 'two'} onClick={setCurrent}><Link className={Ingredients.tab} to="#sauses">Соусы</Link>
        </Tab>
        <Tab value="three" active={current === 'three'} onClick={setCurrent}><Link className={Ingredients.tab} to="#mains">Начинки</Link>
        </Tab>
      </div>
      <div>
        <h2 id="buns">Булки</h2>
        <div>
          {buns.map((item, i) => (
            <Ingredient item={item} key={item._id}
            />
          ))}
        </div>
      </div>
      <div>
        <h2 id="sauses">Соусы</h2>
        <div>
          {sauses.map((item, i) => (
            <Ingredient item={item} key={item._id}
            />
          ))}
        </div>
      </div>
      <div>
        <h2 id="mains">Начинки</h2>
        <div>
          {mains.map((item, i) => (
            <Ingredient item={item} key={item._id}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default BurgerIngredients;