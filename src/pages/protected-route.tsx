import { Route, Redirect, RouteComponentProps } from 'react-router-dom';
import { useEffect, useState, FunctionComponent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from '../services/actions/get-user';

export const ProtectedRoute: FunctionComponent<RouteComponentProps> = ({children, ...rest }) => {
    const [isUserLoaded, setUserLoaded] = useState(false);
    const auth = useSelector((store: any) => store.getUser.isAuthenticated)
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