import { FunctionComponent } from "react";
import { Link, useLocation } from 'react-router-dom';
import orderStyles from './order.module.css';
import { TOrder, TExtendedItem } from '../../utils/types';
import { OPEN_MODAL } from '../../services/actions/ingredient-modal';
import { useDispatch } from 'react-redux';
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from '../../utils/hooks';
import { sayDate } from '../../utils/say-date';

interface IOrder {
  item: TOrder
}

const Order: FunctionComponent<IOrder> = ({item}) => {

  const location = useLocation();
  const dispatch = useDispatch();
  const date = sayDate(item.createdAt);
  const orderId = item['_id'];
  const ingredients = useSelector((store) => store.ingredients.foodData);
  const auth = useSelector((store) => store.getUser.isAuthenticated);

  const orderIngredients = item.ingredients.map((i: string) => {
    return ingredients.filter((item: TExtendedItem) => item._id === i);
  }).flat(1);

  const images = () => {
    if (orderIngredients.length > 6) {
      return orderIngredients.slice(0, 6)
    } else {
      return orderIngredients
    }
  }

  const otherImages = orderIngredients.length > 6
    ? `+${orderIngredients.length - 6}`
    : null;

  const totalPrice = orderIngredients.reduce(
    function (sum: number, item: TExtendedItem) {
        return sum + item.price
    }, 0
  )

  const statusOrder = () => {
    if (item.status === "done") {
      return "Выполнен"
    } else if (item.status === "pending") {
      return "Готовится"
    } else {
      return "Создан"
    }
  }

  const statusClassname = item.status === "done" ? orderStyles.green : "";

  const handleOpenModal = () => {
    dispatch({
      type: OPEN_MODAL,
      item
    })
  }

  return (
    <>
    <Link
      key={orderId}
      to={{
        // Тут мы формируем динамический путь для нашего ингредиента
        // а также сохраняем в свойство background роут, на котором была открыта наша модалка.
        pathname: `/feed/${orderId}`,
        state: { background: location },
      }}
      className={orderStyles.link}
    >
      <div className={`${orderStyles.order} mr-2 mb-4 p-6`} onClick={handleOpenModal}>
        <div className={`${orderStyles.basic} mb-6`}>
          <p className={`text text_type_digits-default mr-2`}>#{item.number}</p>
          <p className={`text text_type_main-default text_color_inactive`}>{date}</p>
        </div>
      <h2 className={`${orderStyles.title} text text_type_main-medium mb-6`}>{item.name}</h2>
      {auth && <p className={`${statusClassname} text text_type_main-default `}>{statusOrder()}</p>}
      <div className={orderStyles.basic}>
        <div className={`${orderStyles.logos}`}>
          {images().map((item, i) => (
            <div className={orderStyles.image} key={i}>
              <img
              alt="Фото"
              src={item.image_mobile}
              className={orderStyles.round}
              />
          </div>
          ))}
          {otherImages && (
              <div className={`${orderStyles.other} text text_type_main-default`}>{otherImages}</div>
          )}
        </div>
        <div className={`${orderStyles.total} mt-2 mb-2`}>
          <p className={`text text_type_digits-default mr-2`}>{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
      </div>
    </Link>
    </>
  )
}

export default Order;