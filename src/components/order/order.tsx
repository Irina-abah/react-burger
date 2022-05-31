import { FunctionComponent } from "react";
import { Link, useLocation } from 'react-router-dom';
import orderStyles from './order.module.css';
import { TOrder } from '../../utils/types';
import { OPEN_MODAL } from '../../services/actions/ingredient-modal';
import { useDispatch } from 'react-redux';
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { sayDate } from '../../utils/say-date';

interface IOrder {
  item: TOrder
}

const Order: FunctionComponent<IOrder> = ({item}) => {

  const location = useLocation();
  const dispatch = useDispatch();
  const date = sayDate(item.createdAt);
  const feedId = item['_id'];

  const handleOpenModal = () => {

    dispatch({
      type: OPEN_MODAL,
      item
    })
  }

  return (
    <>
    <Link
      key={feedId}
      to={{
        // Тут мы формируем динамический путь для нашего ингредиента
        // а также сохраняем в свойство background роут, на котором была открыта наша модалка.
        pathname: `/feed/${feedId}`,
        state: { background: location },
      }}
      className={orderStyles.link}
    >
      <div className={orderStyles.order} onClick={handleOpenModal}>
        <div className={orderStyles.basic}>
          <p className={`text text_type_digits-default mr-2`}># {item._id}</p>
          <p className={`text text_type_main-default mr-2`}>{date}</p>
        </div>
      <h2 className={`${orderStyles.title} text text_type_main-default`}>{item.name}</h2>
      <div>
        <div className={`${orderStyles.logos} mt-2 mb-2`}>

        </div>
        <div className={`${orderStyles.total} mt-2 mb-2`}>
          <p className={`text text_type_digits-default mr-2`}>480</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
      </div>
    </Link>
    </>
  )
}

export default Order;