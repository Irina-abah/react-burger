import { FunctionComponent } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from '../../utils/hooks';
import ingredientStyles from './ingredient-details.module.css';

const IngredientsDetails: FunctionComponent = () => {

  const { ingredientId } = useParams<{ingredientId: string}>();
  const allItems = useSelector((store) => store.ingredients.foodData);
  const item = allItems.find((c) => c._id === ingredientId);

  return (
    <>
      {item && allItems.length !== 0 ? (
        <div className={ingredientStyles.container}>
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
      ) : (
        null
      )}
    </>
    
  )
}

export default IngredientsDetails;