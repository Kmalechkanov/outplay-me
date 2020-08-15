import React, { useContext } from 'react'
import {
  BrowserRouter,
  Switch,
  Redirect,
  Route
} from 'react-router-dom'
import UserContext from './Context'

import HomePage from './pages/home'
import ErrorPage from './pages/error'
import RegisterPage from './pages/register'
import LoginPage from './pages/login'
import DuelPage from './pages/duel'
import Register from './pages/register'

const Navigation = () => {
  const { user } = useContext(UserContext)
  const loggedIn = user && user.loggedIn

  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={HomePage} />
        <Route path='/login'>
          {!loggedIn
            ? (<LoginPage />)
            : (<Redirect to='/' />)}
        </Route>
        <Route path='/register'>
          {!loggedIn
            ? (<RegisterPage />)
            : (<Redirect to='/' />)}
        </Route>
        <Route path='/duel/:id/:side'>
          {loggedIn
            ? (<DuelPage />)
            : (<Redirect to='/login' />)}
        </Route>
        {/* <Route path="/profile/:userid" component={ProfilePage} /> */}
        <Route component={ErrorPage} />
      </Switch>
    </BrowserRouter>
  )
}

export default Navigation