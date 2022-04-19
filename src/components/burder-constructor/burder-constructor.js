import React from "react";
import { v4 as uuidv4 } from 'uuid';
import constructorStyles from "./burder-constructor.module.css";
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import { makeOrder } from "../../services/actions/order";
import { ADD_BUN, ADD_INNER_ITEM } from "../../services/actions/constructor";

const initialState = { price: 0 };
  
  function reducer(state, action) {
    switch (action.type) {
      case "add":
        return { price: state.price + action.price };
      default:
        return state;
    }
  }

function BurgerConstructor() {

  const burderItems = useSelector((store) => store.ingredients.constructor.innerItems);
  const data = useSelector((store) => store.ingredients.foodData);
  const dispatch = useDispatch();
  const showModal = useSelector((store) => store.modal.modalOpened);
  const [isOpen, setIsOpen] = React.useState(false);
  const [orderFailed, setOrderFailed] = React.useState(false);
  const buns = data.filter((item) => item.type === 'bun');
  const insideBunItems = data.filter((item) => item.type !== 'bun');

  const [{ isHover }, dropTargerRef] = useDrop({
    accept: 'ingredient',
    collect: monitor => ({
      isHover: monitor.isOver()
    }),
    drop(item) {
      dispatch({
        type: ADD_INNER_ITEM,
        item: {
          ...item,
          dragId: uuidv4(),
        }
      })
    }
  });
  

  const [stateTotal, dispatchTotal] = React.useReducer(reducer, initialState);

  React.useEffect(() => {

    data.forEach(item => {
      return dispatchTotal({
          type: 'add',
          price: item.price
      });
    });
  }, [data]);

  // const totalPrice = data.reduce(
  //   function (sum, item) {
  //     return sum + item.price
  //   }, 0
  // )

  function handleModal() {
    setIsOpen(!isOpen)
  }

  function handleSubmit() {
    const items = data.map(item => item._id);
    dispatch(makeOrder(items))
    setIsOpen(!isOpen)
  }

  return (
    <>
    <div ref={dropTargerRef} className={`${constructorStyles.container} mt-15 pl-4`}>
      {data.length && buns ? (<div className={`${constructorStyles.wrapper} mb-10`}>
        <div className={`pr-4`}>
          {/* <ConstructorElement
            type="top"
            isLocked={true}
            text={`${buns[0].name} (верх)`}
            price={buns[0].price}
            thumbnail={buns[0].image}
          /> */}
        </div>
        <div className={`${constructorStyles.food_list} pr-2`}>
          {burderItems.map((item, i) => (
            <div key={item._id} className={constructorStyles.food_item}>
              <DragIcon type="primary" />
              <ConstructorElement
                text={item.name}
                price={item.price}
                thumbnail={item.image}
              />
            </div>
          ))}
        </div>
        <div className={`pr-4`}>
          {/* <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${buns[0].name} (низ)`}
            price={buns[0].price}
            thumbnail={buns[0].image}
          /> */}
        </div> 
      </div>) : null}
      <div className={`${constructorStyles.order} pr-4`}>
        <span className={`${constructorStyles.price} text text_type_digits-medium mr-10`}>{stateTotal.price}
          <CurrencyIcon type="primary" />
        </span>
        <Button type="primary" size="large" onClick={handleSubmit}>
          Оформить заказ 
        </Button>
      </div>
    </div>
    {isOpen && (<Modal 
      title=""
      onClose={handleModal}>
        <OrderDetails 
          orderFailed={orderFailed}
        />
    </Modal>)}
    </>
  )
}

export default BurgerConstructor;