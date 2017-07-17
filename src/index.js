import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'
import { Dashboard, Login } from './components/index'
import { store, history } from './store'

ReactDOM.render(
  <BrowserRouter history={history}>
    <Provider store={store}>
        <div>
          <Route exact path="/" component={Dashboard}/>
        </div>
    </Provider>
  </BrowserRouter>,
  document.getElementById('app')
)
