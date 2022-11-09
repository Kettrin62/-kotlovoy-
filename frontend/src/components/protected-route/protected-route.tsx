import * as React from 'react';
// import { useSelector } from '../../services/hooks';
import { Redirect, Route } from 'react-router-dom';
import { FC, useContext } from 'react';
import { RouteProps } from 'react-router-dom';
import AuthContext from '../../services/contexts/auth-context';

interface IProtectedRouteProps {
  path: RouteProps['path'];
  exact: RouteProps['exact'];
  children: React.ReactNode;
}

export const ProtectedRoute: FC<IProtectedRouteProps> = ({ children, ...rest }) => {
  // const { isAuthenticated } = useSelector(state => state.user);
  const { loggedIn } = useContext(AuthContext)

  return (
    <Route
      {...rest}
      render={({ location }) =>
      loggedIn ? (
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