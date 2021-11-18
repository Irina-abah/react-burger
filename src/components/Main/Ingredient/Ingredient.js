import React from "react";
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import IngredientStyles from "../Ingredient/Ingredient.module.css";

function Ingredient({item}) {

  return (
    <div className={IngredientStyles.ingredient}>
      <img src={item.image} alt="Изображение продукта"/>
      <div className={`${IngredientStyles.price} mt-2 mb-1`}>
        <p className={`text text_type_digits-default`}>{item.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <h2 className={`${IngredientStyles.title} text text_type_main-default`}>{item.name}</h2>
      <Counter count={1} size="default" />
    </div>
  )
}

Ingredient.propTypes = PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
    calories: PropTypes.number,
    price: PropTypes.number,
    image: PropTypes.string,
    image_large: PropTypes.string,
    image_mobile: PropTypes.string,
  });

  export default Ingredient;