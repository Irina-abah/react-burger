import React from "react";
import ConstructorStyles from "../BurgerConstructor/BurgerConstructor.module.css";
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientType from "../../../utils/types";
import PropTypes from "prop-types";

function BurgerConstructor({data}) {

  const addedItems = data.filter((item) => item.type !== 'bun')

  return (
    <div className={`${ConstructorStyles.container} mt-15 pl-4`}>
      <div className={`${ConstructorStyles.wrapper} mb-10`}>
        <div className={`pr-4`}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${data[0].name} (верх)`}
            price={data[0].price}
            thumbnail={data[0].image}
          />
        </div>
        
        <div className={`${ConstructorStyles.food_list} pr-2`}>
          {addedItems.map((item, i) => (
            <div key={item._id} className={ConstructorStyles.food_item}>
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
            text={`${data[0].name} (низ)`}
            price={data[0].price}
            thumbnail={data[0].image}
          />
        </div>
        
      </div>
      <div className={`${ConstructorStyles.order} pr-4`}>
        <span className={`${ConstructorStyles.price} text text_type_digits-medium mr-10`}>610
          <CurrencyIcon type="primary" />
        </span>
        <Button type="primary" size="large">
          Оформить заказ 
        </Button>
      </div>
    </div>
  )
}

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(ingredientType).isRequired
}

export default BurgerConstructor;