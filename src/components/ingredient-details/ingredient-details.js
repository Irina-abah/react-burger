import ingredientStyles from "./ingredient-details.module.css";
import ingredientType from "../../utils/types";

function IngredientsDetails({item}) {
  return (
    <div className={ingredientStyles.container}>
      <img src={item.image_large} alt="Изображение продукта"/>
      <h2 className={`text text_type_main-medium mt-4 mb-8`}>{item.name}</h2>
      <ul className={`${ingredientStyles.list} text text_type_main-default text_color_inactive`}>
        <li>
          <h3 className={ingredientStyles.listItem}>Калории, ккал</h3>
          <p className={`text text_type_digits-default mt-2`}>{item.calories}</p>
        </li>
        <li>
          <h3 className={ingredientStyles.listItem}>Белки, г</h3>
          <p className={`text text_type_digits-default mt-2`}>{item.proteins}</p>
        </li>
        <li>
          <h3 className={ingredientStyles.listItem}>Жиры, г</h3>
          <p className={`text text_type_digits-default mt-2`}>{item.fat}</p>
        </li>
        <li>
          <h3 className={ingredientStyles.listItem}>Углеводы, г</h3>
          <p className={`text text_type_digits-default mt-2`}>{item.carbohydrates}</p>
        </li>
      </ul>
    </div>
  )
}

IngredientsDetails.propTypes = {
  item: ingredientType.isRequired
}

export default IngredientsDetails;