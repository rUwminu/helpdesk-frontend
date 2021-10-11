import './App.css'

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'
import { useSelector } from 'react-redux'

import { Navbar } from './components/index'
import { Home, Login, TicketDetail } from './pages/index'

function App() {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: 'http://localhost:4000/graphql',
  })

  const userSignIn = useSelector((state) => state.userSignIn)
  const { user } = userSignIn

  const baseUrl = '/helpdesk-frontend'

  return (
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <Route path={`${baseUrl}/login`}>
            {user ? <Redirect to={`${baseUrl}/home`} /> : <Login />}
          </Route>
          {user ? (
            <>
              <Navbar />
              <Route path={`${baseUrl}/home`} exact>
                <Home />
              </Route>
              <Route path={`${baseUrl}/home/:id`} exact>
                <Home />
              </Route>
              <Route path={`${baseUrl}/ticket_detail/:id`}>
                <TicketDetail />
              </Route>
            </>
          ) : (
            <Redirect to={`${baseUrl}/login`} />
          )}
        </Switch>
      </Router>
    </ApolloProvider>
  )
}

export default App
