import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientStyles from "./ingredient.module.css";
import ingredientType from "../../utils/types";
import { OPEN_MODAL } from "../../services/actions/ingredient-modal";
import { useDispatch } from 'react-redux';
import { useDrag } from 'react-dnd';
import { Link, useLocation } from 'react-router-dom';
function Ingredient({ item }) {

  const location = useLocation();
  const dispatch = useDispatch();
  const ingredientId = item['_id'];
  const [{ opacity }, dragRef] = useDrag({
    type: 'ingredient',
    item: { ...item },
    collect: monitor => ({opacity: monitor.isDragging() ? 0.5 : 1
    })
  })

  const handleOpenModal = () => {

    dispatch({
      type: OPEN_MODAL,
      item
    })
  }

  return (
    <>
    <Link
      key={ingredientId}
      to={{
        // Тут мы формируем динамический путь для нашего ингредиента
        // а также сохраняем в свойство background роут, на котором была открыта наша модалка.
        pathname: `/ingredients/${ingredientId}`,
        state: { background: location },
      }}
      className={ingredientStyles.link}
    >
      <div ref={dragRef} className={ingredientStyles.ingredient} style={{ opacity }} onClick={handleOpenModal}>
        <img src={item.image} alt="Изображение продукта"/>
        <div className={`${ingredientStyles.price} mt-2 mb-2`}>
          <p className={`text text_type_digits-default mr-2`}>{item.price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <h2 className={`${ingredientStyles.title} text text_type_main-default`}>{item.name}</h2>
        {item.count > 0 && <Counter count={item.count} size="default" />}
      </div>
    </Link>
  </>
  )
}

Ingredient.propTypes = {
  item: ingredientType.isRequired
}

export default Ingredient;