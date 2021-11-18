import React from "react";
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import IngredientStyles from "../Ingredient/Ingredient.module.css";

function Ingredient({item}) {

  return (
    <div className={IngredientStyles.ingredient}>
      <img src={item.image} alt="Изображение продукта"/>
      <div className={`${IngredientStyles.price} mt-2 mb-2`}>
        <p className={`text text_type_digits-default`}>{item.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <h2 className={`${IngredientStyles.title} text text_type_main-default`}>{item.name}</h2>
      <Counter count={1} size="default" />
    </div>
  )
}

Ingredient.propTypes = PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
    calories: PropTypes.number,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    image_mobile: PropTypes.string.isRequired,
  });

  export default Ingredient;