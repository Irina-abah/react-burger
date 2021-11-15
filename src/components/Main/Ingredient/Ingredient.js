import React from "react";
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

function Ingredient({item}) {

  return (
    <div>
      <img src={item.image} alt="Изображение продукта"/>
      <div>
        <p>{item.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <h2>{item.name}</h2>
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