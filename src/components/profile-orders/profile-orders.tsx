import { FunctionComponent, useEffect } from 'react';
import Order from '../order/order';
import feedStyles from '../feed/feed.module.css';
import profileOrdersStyles from './profile-orders.module.css'
import { WS_CONNECTION_START, WS_CONNECTION_CLOSE } from '../../services/actions/websocket';
import { useSelector, useDispatch } from '../../utils/hooks';
import { getCookie } from '../../utils/cookie';
import { TOrder } from '../../utils/types';

const ProfileOrders: FunctionComponent = () => {

  const dispatch = useDispatch();
  const orders = useSelector((store) => store.ws.messages);
  const accessToken = getCookie('accessToken') as string;
  const wsToken = accessToken.replace('Bearer ', '');

  useEffect(() => {
    dispatch({
      type: WS_CONNECTION_START,
      payload: `?token=${wsToken}`
    });

    return () => {
      dispatch({
        type: WS_CONNECTION_CLOSE
      });
    };
  }, [dispatch]);

  return (
    <>
    <div className={`${profileOrdersStyles.orders_list}`}>
          {orders.orders.map((item: TOrder, i: any) => (
            <Order item={item} key={i} />
          ))}
        </div>
    </>
  )
}

export default ProfileOrders;