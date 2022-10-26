import * as React from 'react';
// import { useSelector } from '../../services/hooks';
import { Redirect, Route } from 'react-router-dom';
import { FC } from 'react';
import { RouteProps } from 'react-router-dom';

interface IProtectedRouteProps {
  path: RouteProps['path'];
  exact: RouteProps['exact'];
  children: React.ReactNode;
  loggedIn: boolean | null;
}

export const ProtectedRoute: FC<IProtectedRouteProps> = ({ loggedIn, children, ...rest }) => {
  // const { isAuthenticated } = useSelector(state => state.user);

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