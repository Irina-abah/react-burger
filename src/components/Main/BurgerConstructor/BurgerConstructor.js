import React from "react";
import Constructor from "../BurgerConstructor/BurgerConstructor.module.css";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import data from "../../../utils/data";

function BurgerConstructor() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {data.map((element, i) => (
          <ConstructorElement
          key={element._id}
          type={element.type}
          isLocked={true}
          text={element.name}
          price={element.price}
          thumbnail={element.image}
        />
        ))}
    </div>
  )
}

export default BurgerConstructor;