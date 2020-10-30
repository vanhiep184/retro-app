import React from "react";
import { Redirect, Route } from "react-router";
interface IPrivateRoute {
  children?: any;
  [key: string]: any;
}
const PrivateRoute = ({ children, ...routeProps }: IPrivateRoute) => {
  const profile = false;
  if (!profile) return <Redirect to="/login" />;
  return <Route {...routeProps}>{children}</Route>;
};

export default PrivateRoute;
