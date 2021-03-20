import React from 'react';

import { Route, Redirect, RouteProps } from 'react-router-dom';

import Footer from '../components/Footer';
import Header from '../components/Header';
import cookieManager from '../services/cookieManager';

export interface PrivateRouteProps extends RouteProps {
  component: React.ComponentType;
}

const PrivateRoute = ({ component: Component, ...rest }: PrivateRouteProps) => {

  const isUserSigned = () => {
    const { token } = cookieManager.getCookies();
    return (token && token !== '') as boolean;
  }

  if (!isUserSigned()) {
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
