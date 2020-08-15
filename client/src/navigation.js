import React from 'react'
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom'

import HomePage from './pages/home'
import ErrorPage from './pages/error'
import RegisterPage from './pages/register'
import LoginPage from './pages/login'
import DuelPage from './pages/duel'

const Navigation = () => {

  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={HomePage} />
        <Route path='/login' component={LoginPage} />
        <Route path='/register' component={RegisterPage} />
        <Route path='/duel/:id/:side' component={DuelPage} />
        {/* <Route path="/profile/:userid" component={ProfilePage} /> */}
        <Route component={ErrorPage} />
      </Switch>
    </BrowserRouter>
  )
}

export default Navigation