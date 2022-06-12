import { FunctionComponent } from 'react';
import { Route, useLocation, Link } from 'react-router-dom';
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from '../../utils/hooks';
import { TOrder, TExtendedItem, TLocationState } from '../../utils/types';
import { OPEN_MODAL_ORDER } from '../../services/actions/modal';
import { useSelector } from '../../utils/hooks';
import { sayDate } from '../../utils/say-date';
import orderStyles from './order.module.css';

interface IOrder {
  item: TOrder
}

const Order: FunctionComponent<IOrder> = ({ item }) => {

  const dispatch = useDispatch();
  const location = useLocation<TLocationState>()
  const orderId = item['_id']
  const date = sayDate(item.createdAt);
  const ingredients = useSelector((store) => store.ingredients.foodData);

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
      type: OPEN_MODAL_ORDER,
      item
    })
  }

  return (
    <Link 
      className={orderStyles.link}
      to={{
          pathname: `${location.pathname}/${orderId}`,
          state: { background: location }
      }}
    >
    <div className={`${orderStyles.order} mr-2 mb-4 p-6`} onClick={handleOpenModal}>
      <div className={`${orderStyles.basic} mb-6`}>
        <p className={`text text_type_digits-default mr-2`}>#{item.number}</p>
        <p className={`text text_type_main-default text_color_inactive`}>{date}</p>
      </div>
    <h2 className={`${orderStyles.title} text text_type_main-medium mb-6`}>{item.name}</h2>
    <Route exact path="/profile/orders"> 
      <p className={`${statusClassname} text text_type_main-default mb-6 `}>{statusOrder()}</p>
    </Route>
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
    
  )
}

export default Order;