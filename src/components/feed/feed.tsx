import { FunctionComponent, useEffect } from 'react';
import { useSelector, useDispatch } from '../../utils/hooks';
import { WS_CONNECTION_START, WS_CONNECTION_CLOSE } from '../../services/actions/websocket';
import FeedSummary from '../feed-summary/feed-summary';
import Order from '../order/order';
import feedStyles from './feed.module.css';

const Feed: FunctionComponent = () => {

  const dispatch = useDispatch();
  const orders = useSelector((store) => store.ws.messages);

  useEffect(() => {
    dispatch({
      type: WS_CONNECTION_START,
      payload: '/all'
    });

    return () => {
      dispatch({
        type: WS_CONNECTION_CLOSE
      });
    };
  }, [dispatch]);

  return (
    <section className={`${feedStyles.orders} pb-10 pt-10`}>
      <h1 className={`text text_type_main-large mb-5`}>Лента заказов</h1> 
      <div className={feedStyles.container}>
        <div className={`${feedStyles.orders_list}`}>
          {orders.orders.map((item, i) => (
            <Order item={item} key={i}/>
          ))}
        </div>
        <FeedSummary allOrders={orders}/>
      </div>
      
    </section>
  )
}

export default Feed;