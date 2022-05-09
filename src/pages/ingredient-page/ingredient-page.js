import IngredientsDetails from "../../components/ingredient-details/ingredient-details";
import { useSelector } from 'react-redux';
import ingredientPageStyles from "./ingredient-page.module.css";

function IngredientPage() {

  // const allItems = useSelector((store) => store.ingredients.foodData);

  const allItems = JSON.parse(localStorage.getItem("foodData"))

  return (
    <>
    {allItems.length !== 0 ? (
      <section className={ingredientPageStyles.main}>
        <h2 className={`text text_type_main-large mb-8`}>Детали ингредиента</h2>
        <IngredientsDetails />
      </section>
    ) : null }
    </>
   
  )
}

export default IngredientPage;