import React from "react";
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientStyles from "./ingredient.module.css";
import ingredientType from "../../utils/types";
import Modal from "../modal/modal";
import IngredientsDetails from "../ingredient-details/ingredient-details";
import { OPEN_MODAL, CLOSE_MODAL } from "../../services/actions/ingredient-modal";
import { useDispatch, useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';
import { Link, useLocation } from 'react-router-dom';
function Ingredient({item}) {

  const showModal = useSelector((store) => store.modal.modalOpened);
  const location = useLocation();
  const dispatch = useDispatch();
  const ingredientId = item['_id'];
  const [{ opacity }, dragRef] = useDrag({
    type: 'ingredient',
    item: { ...item },
    collect: monitor => ({opacity: monitor.isDragging() ? 0.5 : 1
    })
  })

  const handleOpenModal = () => {

    dispatch({
      type: OPEN_MODAL,
      item
    })
  }

  const handleCloseModal = () => {
    dispatch({
      type: CLOSE_MODAL
    })
  }

  return (
    // <>
    <Link
      key={ingredientId}
      to={{
        // Тут мы формируем динамический путь для нашего ингредиента
        // а также сохраняем в свойство background роут, на котором была открыта наша модалка.
        pathname: `/ingredients/${ingredientId}`,
        state: { background: location },
      }}
      className={ingredientStyles.link}
    >
      <div ref={dragRef} className={ingredientStyles.ingredient} style={{ opacity }} onClick={handleOpenModal}>
      <img src={item.image} alt="Изображение продукта"/>
      <div className={`${ingredientStyles.price} mt-2 mb-2`}>
        <p className={`text text_type_digits-default mr-2`}>{item.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <h2 className={`${ingredientStyles.title} text text_type_main-default`}>{item.name}</h2>
      {item.count > 0 && <Counter count={item.count} size="default" />}
      </div>
      {showModal && (<Modal 
        title="Детали ингредиента" 
        onClose={handleCloseModal}>
        <IngredientsDetails item={item}/>
      </Modal>)}
    </Link>
    
    
    // </>
  )
}

Ingredient.propTypes = {
  item: ingredientType.isRequired
}

export default Ingredient;