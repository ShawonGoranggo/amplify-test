import ROUTES from "./routes/allRoutes";
import { connect } from "react-redux";
import { RenderRoutes } from "./routes/routes";
type AppProps = {
  token: string | null;
};

function App({ token }: AppProps) {
  return (
    <div className="main">
      <RenderRoutes routes={ROUTES} token={token} />
    </div>
  );
}

const mapStateToProps = () => ({
  token: "token",
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(App);
