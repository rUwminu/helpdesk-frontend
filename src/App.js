import "./App.css";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { useSelector } from "react-redux";

import { Navbar } from "./components/index";
import { Home, Login, TicketDetail } from "./pages/index";

function App() {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "http://localhost:4000/graphql",
  });

  const userSignIn = useSelector((state) => state.userSignIn);
  const { user } = userSignIn;

  return (
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
          {user ? (
            <>
              <Navbar />
              <Route path="/" exact>
                <Home />
              </Route>
              <Route path="/:id" exact>
                <Home />
              </Route>
              <Route path="/ticket_detail/:id" exact>
                <TicketDetail />
              </Route>
            </>
          ) : (
            <Redirect to="/login" />
          )}
        </Switch>
      </Router>
    </ApolloProvider>
  );
}

export default App;
