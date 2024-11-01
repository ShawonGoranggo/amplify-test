import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

type AppProps = {
  isLoggedIn: boolean;
  component: React.ComponentType<any>;
};

const PublicRoute = ({ component: Component }: AppProps) => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/login");
  }, []);
  return (
    <>
      <Component />
    </>
  );
};

export default PublicRoute;
