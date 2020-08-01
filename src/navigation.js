import React from 'react'
import {
    BrowserRouter,
    Switch,
    Route
} from 'react-router-dom'

import HomePage from './pages/home'
import ErrorPage from './pages/error'

const Navigation = () => {
  
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route component={ErrorPage} />
        </Switch>
      </BrowserRouter>
    )
  }
  
  export default Navigation