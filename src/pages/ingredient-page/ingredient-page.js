import ingredientPageStyles from "./ingredient-page.module.css";
import ingredientStyles from "../../components/ingredient-details/ingredient-details.module.css";
import { useParams } from 'react-router-dom';

function IngredientPage() {

  const allItems = JSON.parse(localStorage.getItem("foodData"))
  let { ingredientId } = useParams();
  const item = allItems.find((c) => c._id === ingredientId);

  return (
    <section className={ingredientPageStyles.main}>
      <h2 className={`text text_type_main-large mb-8`}>Детали ингредиента</h2>
      <div className={ingredientStyles.container} key={item._id}>
        <img src={item.image_large} alt={item.name}/>
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
    </section>
    
  )
}

export default IngredientPage;