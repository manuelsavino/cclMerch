import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth0 } from "../auth";

const PrivateRoute = ({ component: Component, ...otherProps }) => {
  const { isAuthenticated, loading } = useAuth0();

  return (
    <Route
      {...otherProps}
      render={(props) =>
        !loading ? (
          isAuthenticated ? (
            <Component {...props} />
          ) : (
            <Redirect to="/" />
          )
        ) : (
          <h1>Loading...</h1>
        )
      }
    />
  );
};

export default PrivateRoute;
