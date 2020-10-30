import React from "react";
import { Redirect, Route } from "react-router";
interface IPublishRoute {
  children?: any;
  [key: string]: any;
}
const PublishRoute = ({ children, ...routeProps }: IPublishRoute) => {
  const profile = false;
  if (profile) return <Redirect to="/login" />;
  return <Route {...routeProps}>{children}</Route>;
};

export default PublishRoute;
