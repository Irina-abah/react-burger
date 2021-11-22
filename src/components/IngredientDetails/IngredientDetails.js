
import ingredientStyles from "./IngredientDetails.module.css";
import ingredientType from "../../utils/types";

function IngredientsDetails({item}) {
  return (
    <div>
      <img src={item.image_large} alt="Изображение продукта"/>
      <h2 className={`text text_type_main-medium mt-4`}>{item.name}</h2>
      <ul className={`${ingredientStyles.list} mt-8`}>
        <li className={`text text_type_main-medium text_color_inactive`}>
          <h3>Калории, ккал</h3>
          <p>{item.calories}</p>
        </li>
        <li className={`text text_type_main-medium text_color_inactive`}>
          <h3>Белки, г</h3>
          <p>{item.proteins}</p>
        </li>
        <li className={`text text_type_main-medium text_color_inactive`}>
          <h3>Жиры, г</h3>
          <p>{item.fat}</p>
        </li>
        <li className={`text text_type_main-medium text_color_inactive`}>
          <h3>Углеводы, г</h3>
          <p>{item.carbohydrates}</p>
        </li>
      </ul>
    </div>
  )
}

IngredientsDetails.propTypes = {
  item: ingredientType.isRequired
}

export default IngredientsDetails;