import { FunctionComponent, useEffect } from 'react';
import OrdersSummary from '../orders-summary/orders-summary';
import Order from '../order/order';
import feedStyles from './feed.module.css';
import { useSelector, useDispatch } from '../../utils/hooks';
import {
  wsConnectionStart,
  wsConnectionClose
} from '../../services/actions/websocket';

const Feed: FunctionComponent = () => {

  const dispatch = useDispatch();
  const orders = useSelector((store) => store.ws.messages);
  console.log(orders)

  useEffect(() => {
    dispatch(wsConnectionStart());

    return () => {
      dispatch(wsConnectionClose());
    };
  }, [dispatch]);

  return (
    <section className={`${feedStyles.orders} pb-10 pt-10`}>
      <h1 className={`text text_type_main-large mb-5`}>Лента заказов</h1> 
      <div className={feedStyles.container}>
        <div className={`${feedStyles.orders_list}`}>
          {orders.orders.map((item, i) => (
            <Order item={item} />
          ))}
        </div>
        <OrdersSummary allOrders={orders}/>
      </div>
      
    </section>
  )
}

export default Feed;