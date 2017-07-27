import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'
import { Dashboard, Login } from './components/index'
import { store, history } from './store'
import Web3 from 'web3'
import { web3Provider } from '../app.config'

window.addEventListener('load', () => {
  if (typeof window.web3 !== 'undefined') {
    window.web3 = new Web3(window.web3.currentProvider)
  } else {
    window.web3 = new Web3(new Web3.providers.HttpProvider(web3Provider))
  }


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
})
