import React from 'react'
import { Navigate } from "react-router-dom";

type AppProps = {
  isLoggedIn: boolean;
  component: React.ComponentType<any>;
//   name: string;
//   toggle: boolean;
//   setToggle: (toggle: boolean) => void;
//   handleToggle: () => void;
//   path: string;
};

const PrivateRoute = ({
  component: Component,
//   toggle,
//   setToggle,
//   handleToggle,
  isLoggedIn,
//   name,
//   path,
}: AppProps) => {
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <Component />;
};

export default PrivateRoute;
