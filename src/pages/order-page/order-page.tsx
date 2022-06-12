import { useEffect, useState, FunctionComponent } from 'react';
import { useParams, useRouteMatch } from 'react-router-dom';
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector, useDispatch } from '../../utils/hooks';
import { TOrder, TExtendedItem } from "../../utils/types";
import { sayDate } from '../../utils/say-date';
import { WS_CONNECTION_START, WS_CONNECTION_CLOSE } from '../../services/actions/websocket';
import { getOrder } from '../../services/actions/order';
import { getCookie } from '../../utils/cookie';
import { countIgredients } from '../../utils/filter-count';
import orderModalStyles from '../../components/order-modal/order-modal.module.css';
import orderPageStyles from './order-page.module.css';

const OrderPage: FunctionComponent = () => {

  const dispatch = useDispatch();
  const { orderId } = useParams<{orderId: string}>();
  const userPath = useRouteMatch({ path: "/profile/orders" });
  const orders = useSelector((store) => store.ws.messages.orders);
  const dispatchOrder: any = useSelector((store) => store.order.order);

  const order = orders && orders.find((c: TOrder) => c._id === orderId);
  const ingredients = useSelector((store) => store.ingredients.foodData);


  const statusClassname = order && order.status === "done" ? orderModalStyles.green : "";

  const orderIngredients = order && order.ingredients.map((i: string) => {
    return ingredients.filter((item: TExtendedItem) => item._id === i);
  }).flat(1);
  const uniqueIngredients = countIgredients(orderIngredients || []);

  const totalPrice = orderIngredients?.reduce(
    function (sum: number, item: TExtendedItem) {
        return sum + item.price
    }, 0
  )

  useEffect(() => {
    const accessToken = getCookie('accessToken') as string;
    const wsToken = accessToken.replace('Bearer ', '');
    dispatch(
      userPath ? ({
      type: WS_CONNECTION_START,
      payload: `?token=${wsToken}`
    }) : ({
      type: WS_CONNECTION_START,
      payload: `/all`
    }));

    return () => {
      dispatch({
        type: WS_CONNECTION_CLOSE
      });
    };
  }, [dispatch]);

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
      <section className={`${orderPageStyles.main} pt-30`}>
        <p className={`${orderPageStyles.number} text text_type_digits-default mr-2`}>#{order.number}</p>
        <div>
          <h2 className={`${orderModalStyles.title} text text_type_main-medium mt-10`}>{order.name}</h2>
          <p className={`${statusClassname} text text_type_main-default mt-3 mb-15 `}>{statusOrder()}</p>
        </div>
        <h2 className={`${orderModalStyles.title} text text_type_main-medium mb-6`}>Состав:</h2>
        <div className={orderModalStyles.ingredients}>
          {uniqueIngredients.map((item: TExtendedItem, i) => (
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

export default OrderPage;