import React from "react";
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientStyles from "../Ingredient/Ingredient.module.css";
import ingredientType from "../../../utils/types";
import Modal from "../../Modal/Modal";
import IngredientsDetails from "../../IngredientDetails/IngredientDetails";

function Ingredient({item, onIngredientClick}) {

  const [isOpen, setIsOpen] = React.useState(false);

  function handleOpen() {
    setIsOpen(!isOpen)
  }

  function handleClose() {
    setIsOpen(false)
  }

  return (
    <>
    <div className={IngredientStyles.ingredient} onClick={handleOpen}>
      <img src={item.image_large} alt="Изображение продукта"/>
      <div className={`${IngredientStyles.price} mt-2 mb-2`}>
        <p className={`text text_type_digits-default mr-2`}>{item.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <h2 className={`${IngredientStyles.title} text text_type_main-default`}>{item.name}</h2>
      <Counter count={1} size="default" />
    </div>
    <Modal 
      title='Детали ингредиента'
      isOpen={isOpen} 
      onClose={handleClose}>
      <IngredientsDetails item={item}/>
    </Modal>
    </>
  )
}

Ingredient.propTypes = {
  item: ingredientType
}


  export default Ingredient;