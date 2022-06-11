import { FunctionComponent } from 'react';
import { useParams } from 'react-router-dom';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from '../../utils/hooks';
import { TOrder, TExtendedItem } from '../../utils/types';
import { sayDate } from '../../utils/say-date';
import { countIgredients } from '../../utils/filter-count';
import orderModalStyles from './order-modal.module.css';

const OrderModal: FunctionComponent = () => {

  const { orderId } = useParams<{orderId: string}>();
  const { orders } = useSelector((store) => store.ws.messages);
  const order = orders.find((o: TOrder) => o._id === orderId);
  console.log(order)
  const ingredients = useSelector((store) => store.ingredients.foodData);

  const statusClassname = order?.status === "done" ? orderModalStyles.green : "";

  const orderIngredients = order?.ingredients.map((i: string) => {
    return ingredients.filter((item: TExtendedItem) => item._id === i);
  }).flat(1);

  const uniqueIngredients = countIgredients(orderIngredients || []);
  
  const totalPrice = orderIngredients?.reduce(
    function (sum: number, item: TExtendedItem) {
        return sum + item.price
    }, 0
  )

  const statusOrder = () => {
    if (order?.status === "done") {
      return "Выполнен"
    } else if (order?.status === "pending") {
      return "Готовится"
    } else {
      return "Создан"
    }
  }

  return (
    <>
    {order && orders.length > 0 ? (
      <section className={`${orderModalStyles.main}`}>
        <p className={`${orderModalStyles.number} text text_type_digits-default mr-2`}>#{order.number}</p>
        <div>
          <h2 className={`${orderModalStyles.title} text text_type_main-medium mt-5`}>{order.name}</h2>
          <p className={`${statusClassname} text text_type_main-default mt-3 mb-15 `}>{statusOrder()}</p>
        </div>
        <h2 className={`${orderModalStyles.title} text text_type_main-medium mb-6`}>Состав:</h2>
        <div className={orderModalStyles.ingredients}>
          {uniqueIngredients.map((item: TExtendedItem, i: any) => (
            <div className={`${orderModalStyles.ingredient} mb-4 mr-6`} key={i}>
              <div className={orderModalStyles.name_info}>
                <div className={orderModalStyles.image} key={i}>
                  <img
                  alt="Фото"
                  src={item.image_mobile}
                  className={orderModalStyles.round}
                  />
                </div>
                <h3 className={`${orderModalStyles.item_name} text text_type_main-default ml-4 `}>{item.name}</h3>
              </div>
              <div className={orderModalStyles.prices}>
                <p className={orderModalStyles.quantity + " text text_type_digits-default mr-2"}>
                  {orderIngredients && `${item.count} x ${item.price}`}
                </p>
                <CurrencyIcon type="primary" />
              </div>
            </div>
          ))}
        </div>
        <div className={`${orderModalStyles.footer} mt-10`}>
          <p className={`text text_type_main-default text_color_inactive`}>{sayDate(order.createdAt)}</p>
          <div className={`${orderModalStyles.total} mt-2 mb-2`}>
            <p className={`text text_type_digits-default mr-2`}>{totalPrice}</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </section>
      ) : null}
    </> 
  )
}

export default OrderModal;