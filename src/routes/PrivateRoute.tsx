import React from 'react';

import { Route, Redirect, RouteProps } from 'react-router-dom';

import useAuth from '../contexts/auth';
import Footer from '../components/Footer';
import Header from '../components/Header';

export interface PrivateRouteProps extends RouteProps {
  component: React.ComponentType;
}

const PrivateRoute = ({ component: Component, ...rest }: PrivateRouteProps) => {
  const { signed } = useAuth();

  if (!signed) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <Header />
      <Route {...rest} render={(props) => <Component {...props as any} />} />
      <Footer />
    </>
  );
};

export default PrivateRoute;
