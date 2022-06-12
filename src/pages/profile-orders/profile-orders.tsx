import { FunctionComponent, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { WS_CONNECTION_START, WS_CONNECTION_CLOSE } from '../../services/actions/websocket';
import { useSelector, useDispatch } from '../../utils/hooks';
import { getCookie } from '../../utils/cookie';
import { TOrder } from '../../utils/types';
import Order from '../../components/order/order';
import ProfileMenu from '../profile-menu/profile-menu';
import profileOrdersStyles from './profile-orders.module.css';

const ProfileOrders: FunctionComponent = () => {

  const location = useLocation();
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
  }, [dispatch, wsToken]);

  return (
    <div className={`${profileOrdersStyles.profile_orders} pt-10`}>
    <ProfileMenu />
    <div className={`${profileOrdersStyles.orders_list}`}>
      {orders.orders.map((item: TOrder, i: any) => (
        <Order item={item} key={i} />
      ))}
    </div>
    </div>
  )
}

export default ProfileOrders;