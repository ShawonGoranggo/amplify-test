import { Route, Routes } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";
type RoutesType = {
  path: string;
  key: string;
  component: any;
  isPrivate: boolean;
  exact: boolean;
};
type AppProps = {
  routes: RoutesType[];
  token: string | null;
};
export function RenderRoutes({ routes, token }: AppProps) {
  return (
    <Routes>
      {routes?.map((route: RoutesType) => {
        const {isPrivate, key, path } = route;
        return (
          <Route
            key={key}
            path={path}
            element={
              isPrivate ? (
                <PrivateRoutes
                  isLoggedIn={!!token}
                  component={route.component}
                  //   path={route.path}
                  //   key={route.key}
                  //   name={route.key}
                  //   toggle={toggle}
                  //   setToggle={setToggle}
                  //   handleToggle={handleToggle}
                />
              ) : (
                <PublicRoutes
                  isLoggedIn={!!token}
                  component={route.component}
                  // key={route.key}
                  // name={route.key}
                  // path={route.path}
                  // toggle={toggle}
                  // setToggle={setToggle}
                  // handleToggle={handleToggle}
                />
              )
            }
          ></Route>
        );
      })}
      <Route path="*" element="Something went wrong" />
    </Routes>
  );
}
// logic of which route logics
