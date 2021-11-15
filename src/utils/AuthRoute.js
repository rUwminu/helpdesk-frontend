import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children, ...rest }) => {
  // Get the login data and check is user logined
  const userSignIn = useSelector((state) => state.userSignIn);
  const { user } = userSignIn;

  return (
    <Route
      {...rest}
      render={() => {
        return user ? children : <Redirect to="/helpdesk-frontend/login" />;
      }}
    ></Route>
  );
};

export default PrivateRoute;
