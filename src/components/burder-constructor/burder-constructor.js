import React from "react";
import constructorStyles from "./burder-constructor.module.css";
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientType from "../../utils/types";
import PropTypes from "prop-types";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";

function BurgerConstructor({data}) {

  const [isOpen, setIsOpen] = React.useState(false)
  const buns = data.filter((item) => item.type === 'bun');
  const addedItems = data.filter((item) => item.type !== 'bun')

  function handleModal() {
    setIsOpen(!isOpen)
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
          {addedItems.map((item, i) => (
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
        <span className={`${constructorStyles.price} text text_type_digits-medium mr-10`}>610
          <CurrencyIcon type="primary" />
        </span>
        <Button type="primary" size="large" onClick={handleModal}>
          Оформить заказ 
        </Button>
      </div>
    </div>
    {isOpen && (<Modal 
      title=""
      onClose={handleModal}>
      <OrderDetails />
    </Modal>)}
    </>
  )
}

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(ingredientType).isRequired
}

export default BurgerConstructor;