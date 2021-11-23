import React from "react";
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientStyles from "./ingredient.module.css";
import ingredientType from "../../utils/types";
import Modal from "../modal/modal";
import IngredientsDetails from "../ingredient-details/ingredient-details";

function Ingredient({item}) {

  const [isOpen, setIsOpen] = React.useState(false);

  function handleOpen() {
    setIsOpen(!isOpen)
  }

  function handleClose() {
    setIsOpen(false)
  }

  return (
    <>
    <div className={ingredientStyles.ingredient} onClick={handleOpen}>
      <img src={item.image} alt="Изображение продукта"/>
      <div className={`${ingredientStyles.price} mt-2 mb-2`}>
        <p className={`text text_type_digits-default mr-2`}>{item.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <h2 className={`${ingredientStyles.title} text text_type_main-default`}>{item.name}</h2>
      <Counter count={1} size="default" />
    </div>
    <Modal 
      title="Детали ингредиента"
      isOpen={isOpen} 
      onClose={handleClose}>
      <IngredientsDetails item={item}/>
    </Modal>
    </>
  )
}

Ingredient.propTypes = {
  item: ingredientType.isRequired
}

export default Ingredient;