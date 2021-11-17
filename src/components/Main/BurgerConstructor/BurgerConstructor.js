import React from "react";
import ConstructorStyles from "../BurgerConstructor/BurgerConstructor.module.css";
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import data from "../../../utils/data";

function BurgerConstructor() {

  const addedItems = data.filter((item) => item.type !== 'bun')

  return (
    <div className={`mt-15`}>
      <div className={`${ConstructorStyles.wrapper} mb-10 pr-2 pl-4`}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={`${data[0].name} (верх)`}
          price={data[0].price}
          thumbnail={data[0].image}
        />
        <div className={`${ConstructorStyles.food_list} pr-2 pl-4`}>
          {addedItems.map((item, i) => (
            <div className={ConstructorStyles.food_item}>
              <DragIcon type="primary" />
              <ConstructorElement
                key={item._id}
                text={item.name}
                price={item.price}
                thumbnail={item.image}
              />
            </div>
          ))}
        </div>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={`${data[0].name} (низ)`}
          price={data[0].price}
          thumbnail={data[0].image}
        />
      </div>
      <div className={`${ConstructorStyles.order}`}>
        <span className={`${ConstructorStyles.price}`}>
          <p className={`text text_type_digits-medium`}>999</p>
          <CurrencyIcon type="primary" />
        </span>
        <Button type="primary" size="large">
          Оформить заказ 
        </Button>
      </div>
    </div>
    
    
  )
}

export default BurgerConstructor;