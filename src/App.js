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
import { Home, Login } from './pages/index'

function App() {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: 'http://localhost:4000/graphql',
  })

  const userSignIn = useSelector((state) => state.userSignIn)
  const { userInfo } = userSignIn

  return (
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <Route path='/login'>
            {userInfo ? <Redirect to='/' /> : <Login />}
          </Route>{' '}
          {userInfo ? (
            <>
              <Navbar />
              <Route path='/' exact>
                <Home />
              </Route>
              <Route path='/:id' exact>
                <Home />
              </Route>
            </>
          ) : (
            <Redirect to='/login' />
          )}
        </Switch>
      </Router>
    </ApolloProvider>
  )
}

export default App
