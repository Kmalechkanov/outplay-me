import React from 'react'
import ReactDOM from 'react-dom'
import './css/index.css'
import App from './App'
import Navigation from './navigation'

ReactDOM.render(
  <React.StrictMode>
    <App>
      <Navigation />
    </App>
  </React.StrictMode>,
  document.getElementById('root')
)