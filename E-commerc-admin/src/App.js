
import React, { lazy } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import AccessibleNavigationAnnouncer from './components/AccessibleNavigationAnnouncer'

const Layout = lazy(() => import('./containers/Layout'))
const Login = lazy(() => import('./pages/Login'))
const CreateAccount = lazy(() => import('./pages/CreateAccount'))
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'))

function App() {
  window.path = "http://localhost:4040/admin"
  return (
    <>
      <Router>
        <AccessibleNavigationAnnouncer />
        <Switch>
          {
            !localStorage.getItem("adminAuth") ? 
            <>
            <Route path="/login" component={Login} />
          <Route path="/forgot-password" component={ForgotPassword} />
          <Redirect  from="*" to="/login" />

            </>
            :
            <>
          <Route path="/app" component={Layout} />
          <Redirect  from="*" to="/app/products" /> 
            </>
          }
        </Switch>
      </Router>
    </>
  )
}

export default App
