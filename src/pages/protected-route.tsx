import { Route, Redirect } from 'react-router-dom';
import { useEffect, useState, FunctionComponent, ReactNode } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from '../services/actions/get-user';

interface IProtectedRoute {
  children: ReactNode | "",
  path: string
}

export const ProtectedRoute: FunctionComponent<IProtectedRoute> = ({ children, ...rest }) => {
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
      render={({ location }) =>
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