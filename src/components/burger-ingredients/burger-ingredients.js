import React, {useRef, useCallback} from "react";
import { HashLink as Link } from "react-router-hash-link";
import ingredientsStyles from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import Ingredient from "../ingredient/ingredient";
import { LOAD_ERROR } from "../../utils/constants";
import PropTypes from "prop-types";
import { useSelector } from 'react-redux';
import CheckHeight from "../../utils/windowHeight";

const BurgerIngredients = () => {

  const data = useSelector((store) => store.ingredients.foodData);
  const loadingFailed = useSelector((store) => store.ingredients.foodDataFailed);
  const [current, setCurrent] = React.useState('one');
  const buns = data.filter((item) => item.type === 'bun');
  const sauses = data.filter((item) => item.type === 'sauce');
  const mains = data.filter((item) => item.type === 'main');

  const bunsRef = useRef(null);
  const sausesRef = useRef(null);
  const mainsRef = useRef(null);
  const allRef = useRef(null);

  const handleScroll = () => {
		const top = allRef.current.scrollTop + allRef.current.offsetTop;
		if (sausesRef.current.offsetTop > top) {
			setCurrent("one");
		} else if (mainsRef.current.offsetTop > top && top >= sausesRef.current.offsetTop) {
			setCurrent("two");
		} else {
			setCurrent("three");
		}
	};

  return (
    <div className={`mr-10`}>
      <h1 className={`text text_type_main-large mb-5`}>Соберите бургер</h1>
      <div style={{ display: 'flex' }}>
        <Tab innerRef={bunsRef} value="one" active={current === 'one'} onClick={setCurrent}><Link className={ingredientsStyles.tab} to="#buns">Булки</Link>
        </Tab>
        <Tab innerRef={sausesRef} value="two" active={current === 'two'} onClick={setCurrent}><Link className={ingredientsStyles.tab} to="#sauses">Соусы</Link>
        </Tab>
        <Tab innerRef={mainsRef} value="three" active={current === 'three'} onClick={setCurrent}><Link className={ingredientsStyles.tab} to="#mains">Начинки</Link>
        </Tab>
      </div>
      {loadingFailed ? <p className={`${ingredientsStyles.error} text text_type_main-medium pt-15`}>{LOAD_ERROR}</p> : (<div className={ingredientsStyles.menu} onScroll={handleScroll} ref={allRef}>
        <div className={`mt-10`} ref={bunsRef}>
          <h2 className={`${ingredientsStyles.title} text text_type_main-medium`} id="buns">Булки</h2>
          <div className={`${ingredientsStyles.type} mr-2 ml-4 mt-6`}>
            {buns.map((item, i) => (
              <Ingredient item={item} key={item._id}
              />
            ))}
          </div>
        </div>
        <div className={`mt-10`} ref={sausesRef}>
          <h2 className={`${ingredientsStyles.title} text text_type_main-medium`} id="sauses">Соусы</h2>
          <div className={`${ingredientsStyles.type} mr-2 ml-4 mt-6`}>
            {sauses.map((item, i) => (
              <Ingredient item={item} key={item._id}
              />
            ))}
          </div>
        </div>
        <div className={`mt-10`} ref={mainsRef}>
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

export default BurgerIngredients;