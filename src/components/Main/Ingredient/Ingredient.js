import React from "react";
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import IngredientStyles from "../Ingredient/Ingredient.module.css";
import ingredientType from "../../../utils/types";

function Ingredient({item, onIngredientDetails}) {

  return (
    <div className={IngredientStyles.ingredient} onClick={onIngredientDetails}>
      <img src={item.image} alt="Изображение продукта"/>
      <div className={`${IngredientStyles.price} mt-2 mb-2`}>
        <p className={`text text_type_digits-default mr-2`}>{item.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <h2 className={`${IngredientStyles.title} text text_type_main-default`}>{item.name}</h2>
      <Counter count={1} size="default" />
    </div>
  )
}

Ingredient.propTypes = {
  item: ingredientType
}


  export default Ingredient;