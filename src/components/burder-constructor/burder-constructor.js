import React from "react";
import constructorStyles from "./burder-constructor.module.css";
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { BurgerContext, OrderContext } from "../../contexts/burger-context";
import allIngredientsApi from "../../utils/main-api";
import { useSelector } from 'react-redux';

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

  const data = useSelector((store) => store.ingredients.foodData);

  const [isOpen, setIsOpen] = React.useState(false);
  const [orderNumber, setOrderNumber] = React.useState(0);
  const [orderFailed, setOrderFailed] = React.useState(false);
  const buns = data.filter((item) => item.type === 'bun');
  
  const insideBunItems = data.filter((item) => item.type !== 'bun');
  

  const [state, dispatch] = React.useReducer(reducer, initialState);

  React.useEffect(() => {

    data.forEach(item => {
      return dispatch({
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
    setIsOpen(!isOpen)

    const items = data.map(item => item._id);

    allIngredientsApi.makeOrder(items)
    .then((res) => {
      setOrderFailed(false)
      setOrderNumber(res.order.number)
    })
    .catch((err) => {
      setOrderFailed(true)
      console.log(err)
    }) 
  }

  return (
    <>
    <div className={`${constructorStyles.container} mt-15 pl-4`}>
      {data.length && buns ? (<div className={`${constructorStyles.wrapper} mb-10`}>
        <div className={`pr-4`}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${buns[0].name} (верх)`}
            price={buns[0].price}
            thumbnail={buns[0].image}
          />
        </div>
        <div className={`${constructorStyles.food_list} pr-2`}>
          {insideBunItems.map((item, i) => (
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
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${buns[0].name} (низ)`}
            price={buns[0].price}
            thumbnail={buns[0].image}
          />
        </div> 
      </div>) : null}
      <div className={`${constructorStyles.order} pr-4`}>
        <span className={`${constructorStyles.price} text text_type_digits-medium mr-10`}>{state.price}
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
      <OrderContext.Provider 
        value={orderNumber}
      >
        <OrderDetails 
          orderFailed={orderFailed}
        />
      </OrderContext.Provider>
    </Modal>)}
    </>
  )
}

export default BurgerConstructor;