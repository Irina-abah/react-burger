import { FunctionComponent } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from '../../utils/hooks';
import { TItem } from '../../utils/types';
import ingredientPageStyles from './ingredient-page.module.css';
import ingredientStyles from '../../components/ingredient-details/ingredient-details.module.css';

const IngredientPage: FunctionComponent = () => {

  const { ingredientId } = useParams<{ingredientId: string}>();
  const allItems = useSelector((store) => store.ingredients.foodData);
  const ingredient = allItems.find((c: TItem) => c._id === ingredientId);

  return (
    <>
    {ingredient ? (
      <section className={ingredientPageStyles.main}>
        <h2 className={`text text_type_main-large mb-8`}>Детали ингредиента</h2>
        <div className={ingredientStyles.container} key={ingredient._id}>
          <img src={ingredient.image_large} alt={ingredient.name}/>
          <h2 className={`text text_type_main-medium mt-4 mb-8`}>{ingredient.name}</h2>
          <ul className={`${ingredientStyles.list} text text_type_main-default text_color_inactive`}>
            <li>
              <h3 className={ingredientStyles.listItem}>Калории, ккал</h3>
              <p className={`text text_type_digits-default mt-2`}>{ingredient.calories}</p>
            </li>
            <li>
              <h3 className={ingredientStyles.listItem}>Белки, г</h3>
              <p className={`text text_type_digits-default mt-2`}>{ingredient.proteins}</p>
            </li>
            <li>
              <h3 className={ingredientStyles.listItem}>Жиры, г</h3>
              <p className={`text text_type_digits-default mt-2`}>{ingredient.fat}</p>
            </li>
            <li>
              <h3 className={ingredientStyles.listItem}>Углеводы, г</h3>
              <p className={`text text_type_digits-default mt-2`}>{ingredient.carbohydrates}</p>
            </li>
          </ul>
        </div>
      </section>
    ) : null}
    </> 
  )
}

export default IngredientPage;