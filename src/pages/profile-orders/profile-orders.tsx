import { FunctionComponent, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Order from '../../components/order/order';
import ProfileMenu from '../profile-menu/profile-menu';
import profileOrdersStyles from './profile-orders.module.css';
import { WS_CONNECTION_START, WS_CONNECTION_CLOSE } from '../../services/actions/websocket';
import { useSelector, useDispatch } from '../../utils/hooks';
import { getCookie } from '../../utils/cookie';
import { TOrder } from '../../utils/types';

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
  }, [dispatch]);

  return (
    <div className={`${profileOrdersStyles.profile_orders} pt-10`}>
    <ProfileMenu />
    <div className={`${profileOrdersStyles.orders_list}`}>
          {orders.orders.map((item: TOrder, i: any) => (
            <Link
              key={item['_id']}
              to={{
                pathname: `/profile/orders/${item['_id']}`,
                state: { background: location },
              }}
              className={profileOrdersStyles.link}
            >
              <Order item={item} key={i} />
            </Link>
          ))}
        </div>
    </div>
  )
}

export default ProfileOrders;