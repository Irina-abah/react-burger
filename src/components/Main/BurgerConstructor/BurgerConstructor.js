import React from "react";
import ConstructorStyles from "../BurgerConstructor/BurgerConstructor.module.css";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import data from "../../../utils/data";

function BurgerConstructor() {

  const addedItems = data.filter((item) => item.type !== 'bun')

  return (
    <div className={`${ConstructorStyles.wrapper} mt-15`}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <ConstructorElement
        type="top"
        isLocked={true}
        text={`${data[0].name} (верх)`}
        price={data[0].price}
        thumbnail={data[0].image}
      />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {addedItems.map((item, i) => (
          <div className={ConstructorStyles.food}>
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
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <ConstructorElement
        type="bottom"
        isLocked={true}
        text={`${data[0].name} (низ)`}
        price={data[0].price}
        thumbnail={data[0].image}
      />
      </div>

    </div>
    
  )
}

export default BurgerConstructor;