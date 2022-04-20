import React, { useCallback, useMemo } from "react";
import { v4 as uuidv4 } from 'uuid';
import constructorStyles from "./burder-constructor.module.css";
import { ConstructorElement, CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import ConstructorItem from "../constructor-item/constructor-item";
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import { makeOrder } from "../../services/actions/order";
import { ADD_BUN, RESET_CONSTRUSTOR, ADD_INNER_ITEM, UPDATE_CONSTRUCTOR_LIST } from "../../services/actions/constructor";

function BurgerConstructor() {

  const dispatch = useDispatch();
  const {innerItems} = useSelector((store) => store.ingredients.constructor);
  const {selectedBun} = useSelector((store) => store.ingredients.constructor);
  const allBurger = useSelector((store) => store.ingredients.constructor);
  const data = useSelector((store) => store.ingredients.foodData);
  const [isOpen, setIsOpen] = React.useState(false);

  const allBurgerItems = useMemo(() => {
    return selectedBun._id ? innerItems.concat([selectedBun, selectedBun]) : innerItems;
  }, [innerItems, selectedBun]);

  const [{ isHover }, dropTargerRef] = useDrop({
    accept: 'ingredient',
    collect: monitor => ({
      isHover: monitor.isOver()
    }),
    drop(item) {
      if (item.type === "bun") {
        dispatch({
          type: ADD_BUN,
          bun: item
        })
      } else {
        dispatch({
          type: ADD_INNER_ITEM,
          item: {
            ...item,
            dragId: uuidv4()
          }
        })
      }
      
    }
  });

  const moveCard = useCallback((dragIndex, hoverIndex) => {
    const dragCard = innerItems[dragIndex];
    const newCards = [...innerItems]
    newCards.splice(dragIndex, 1)
    newCards.splice(hoverIndex, 0, dragCard)
    dispatch({
      type: UPDATE_CONSTRUCTOR_LIST,
      updatedItems: newCards,
    })
  }, [innerItems, dispatch]);

  const totalPrice = allBurgerItems.reduce(
    function (sum, item) {
        return sum + item.price
    }, 0
  )

  

  function checkPrice(price) {
    if (isNaN(price)) {
      return 0
    } else {
      return price
    }
  }

  function handleCloseModal() {
    setIsOpen(!isOpen)
    dispatch({
      type: RESET_CONSTRUSTOR
    })
  }

  function handleSubmit() {
    const items = data.map(item => item._id);
      dispatch(makeOrder(items))
      setIsOpen(!isOpen)
  }

  return (
    <>
    <div ref={dropTargerRef} className={`${constructorStyles.container} mt-15 pl-4 ${isHover ? constructorStyles.hover : ''}`}>
      <div className={`${constructorStyles.wrapper} mb-10`}>
        <div className={`pr-4`}>
          {selectedBun.type &&(<ConstructorElement
            type="top"
            isLocked={true}
            text={`${selectedBun.name} (верх)`}
            price={selectedBun.price}
            thumbnail={selectedBun.image}
          />)}
        </div>
        <div className={`${constructorStyles.food_list} pr-2`}>
          {innerItems.map((item, i) => (
            <ConstructorItem key={item.dragId} index={i} item={item} moveCard={moveCard}/>
          ))}
        </div>
        <div className={`pr-4`}>
          {selectedBun.type && (<ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${selectedBun.name} (низ)`}
            price={selectedBun.price}
            thumbnail={selectedBun.image}
          />)}
        </div> 
      </div>
      <div className={`${constructorStyles.order} pr-4`}>
        <span className={`${constructorStyles.price} text text_type_digits-medium mr-10`}>{checkPrice(totalPrice)} 
          <CurrencyIcon type="primary" />
        </span>
        <Button type="primary" size="large" onClick={handleSubmit}>
          Оформить заказ 
        </Button>
      </div>
    </div>
    {isOpen && (<Modal 
      title=""
      onClose={handleCloseModal}>
        <OrderDetails />
    </Modal>)}
    </>
  )
}

export default BurgerConstructor;