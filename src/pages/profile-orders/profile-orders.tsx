import { FunctionComponent, useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { WS_CONNECTION_START, WS_CONNECTION_CLOSE } from '../../services/actions/websocket';
import { useSelector, useDispatch } from '../../utils/hooks';
import { getCookie } from '../../utils/cookie';
import Order from '../../components/order/order';
import ProfileMenu from '../profile-menu/profile-menu';
import profileOrdersStyles from './profile-orders.module.css';

const ProfileOrders: FunctionComponent = () => {

  const dispatch = useDispatch();
  const orders = useSelector((store) => store.ws.messages);
  const user = useSelector((state) => state.getUser.user);
  const auth = useSelector((state) => state.getUser.isAuthenticated);

  useEffect(() => {
    if (user.name !== '' && user.email !== '') {
      const accessToken = getCookie('accessToken') as string;
      const wsToken = accessToken.replace('Bearer ', '');
      dispatch({
        type: WS_CONNECTION_START,
        payload: `?token=${wsToken}`
      });
  
      return () => {
        dispatch({
          type: WS_CONNECTION_CLOSE
        });
      };
    }
  }, [user, dispatch]);

  // if (!auth) {
  //   return (
  //     <Redirect
  //       to={{
  //         pathname: "/login",
  //       }}
  //     />
  //   );
  // }

  return (
    <div className={`${profileOrdersStyles.profile_orders} pt-10`}>
    <ProfileMenu />
    <div className={`${profileOrdersStyles.orders_list}`}>
      {orders.orders.map((item, i) => (
        <Order item={item} key={i} />
      ))}
    </div>
    </div>
  )
}

export default ProfileOrders;