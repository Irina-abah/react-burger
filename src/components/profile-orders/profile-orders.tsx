import { FunctionComponent, useEffect } from 'react';
import Order from '../order/order';
import feedStyles from '../feed/feed.module.css';
import { WS_CONNECTION_START, WS_CONNECTION_CLOSE } from '../../services/actions/websocket';
import { useSelector, useDispatch } from '../../utils/hooks';
import { getCookie } from '../../utils/cookie';
import { TOrder } from '../../utils/types';

const ProfileOrders: FunctionComponent = () => {

  const dispatch = useDispatch();
  const orders = useSelector((store) => store.ws.messages);
  const accessToken = getCookie('accessToken') as string;
  const wsToken = accessToken.replace('Bearer ', '');
  console.log(wsToken)

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
    <div className={`${feedStyles.orders_list}`}>
          {orders.orders.map((item: TOrder, i) => (
            <Order item={item} />
          ))}
        </div>
    </>
  )
}

export default ProfileOrders;