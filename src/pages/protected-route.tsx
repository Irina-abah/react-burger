import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useEffect, useState, FunctionComponent } from 'react';
import { useSelector, useDispatch } from '../utils/hooks';
import { getUser } from '../services/actions/get-user';

export const ProtectedRoute: FunctionComponent<RouteProps> = ({children, ...rest }) => {
    const [isUserLoaded, setUserLoaded] = useState<boolean>(false);
    const auth = useSelector((store) => store.getUser.isAuthenticated)
    const dispatch = useDispatch();

    const init = async () => {
      await dispatch(getUser());
      setUserLoaded(true);
    };

  useEffect(() => {
    init();
  }, []);

  if (!isUserLoaded) {
    return null;
  }

    return (
    <Route
      {...rest}
      render={({ location }: any) =>
        auth ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location }
            }}
          />
        )
      }
    />
  );
} 