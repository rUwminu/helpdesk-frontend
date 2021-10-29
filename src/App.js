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
import {
  Home,
  Login,
  TicketDetail,
  TicketPanel,
  TicketReport,
  UserPanel,
  UserProfile,
  BlogPage,
  PdfViewer,
  ErrorPage,
} from './pages/index'
import PrivateRoute from './utils/PrivateRoute'

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
        {user && <Navbar />}
        <Switch>
          <Route path={`/login`}>
            {user ? <Redirect to={`/helpdesk-frontend/home`} /> : <Login />}
          </Route>

          <Route path={`/helpdesk-frontend/home`} exact={true}>
            <Home />
          </Route>
          <Route path={`/helpdesk-frontend/home/:id`} exact={true}>
            <Home />
          </Route>
          <Route path={`/helpdesk-frontend/ticket_detail/:id`}>
            <TicketDetail />
          </Route>
          <Route path={`/helpdesk-frontend/user/:id`}>
            <UserProfile />
          </Route>
          <Route path={`/helpdesk-frontend/Blog`}>
            <BlogPage />
          </Route>
          <Route path={`/helpdesk-frontend/pdf_view/:id`}>
            <PdfViewer />
          </Route>

          <PrivateRoute path={`/helpdesk-frontend/ticket_panel`}>
            <TicketPanel />
          </PrivateRoute>
          <PrivateRoute path={`/helpdesk-frontend/ticket_report`}>
            <TicketReport />
          </PrivateRoute>
          <PrivateRoute path={`/helpdesk-frontend/user_panel`}>
            <UserPanel />
          </PrivateRoute>

          <Route path='*' exact={true}>
            <ErrorPage />
          </Route>
        </Switch>
      </Router>
    </ApolloProvider>
  )
}

export default App
