import { FunctionComponent, useEffect } from 'react';
import OrdersSummary from '../orders-summary/orders-summary';
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
    <section className={`${feedStyles.orders} pl-5 pr-5 pb-10 pt-10`}>
      <h1 className={`text text_type_main-large mb-5`}>Лента заказов</h1> 
      <div className={feedStyles.container}>
        <div className={`mr-15`}>
        </div>
        <OrdersSummary allOrders={orders}/>
      </div>
      
    </section>
  )
}

export default Feed;