// import { useAuth } from '../services/auth';
import { Route, Redirect } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from '../services/actions/get-user';

export function ProtectedRoute({ children, ...rest }) {
    // let { getUser, ...auth } = useAuth();
    const [isUserLoaded, setUserLoaded] = useState(false);
    const auth = useSelector((store) => store.login.isAuthenticated)
    const dispatch = useDispatch();

    const init = async () => {
    await dispatch(getUser());
    setUserLoaded(true);

    // if (!isUserLoaded) {
    //   return null;
    // }
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