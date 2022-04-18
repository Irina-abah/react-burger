import React from "react";
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientStyles from "./ingredient.module.css";
import ingredientType from "../../utils/types";
import Modal from "../modal/modal";
import IngredientsDetails from "../ingredient-details/ingredient-details";
import { OPEN_MODAL, CLOSE_MODAL } from "../../services/actions/ingredient-modal";
import { useDispatch, useSelector } from 'react-redux';

function Ingredient({item}) {

  const showModal = useSelector((store) => store.modal.modalOpened);
  const dispatch = useDispatch();

  const handleOpenModal = () => {

    dispatch({
      type: OPEN_MODAL,
      item
    })
    console.log(item)
  }

  const handleCloseModal = () => {
    dispatch({
      type: CLOSE_MODAL
    })
  }

  return (
    <>
    <div className={ingredientStyles.ingredient} onClick={handleOpenModal}>
      <img src={item.image} alt="Изображение продукта"/>
      <div className={`${ingredientStyles.price} mt-2 mb-2`}>
        <p className={`text text_type_digits-default mr-2`}>{item.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <h2 className={`${ingredientStyles.title} text text_type_main-default`}>{item.name}</h2>
      <Counter count={1} size="default" />
    </div>
    {showModal && (<Modal 
      title="Детали ингредиента" 
      onClose={handleCloseModal}>
      <IngredientsDetails />
    </Modal>)}
    
    </>
  )
}

Ingredient.propTypes = {
  item: ingredientType.isRequired
}

export default Ingredient;