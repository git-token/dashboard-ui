import React from 'react'
import ReactDOM from 'react-dom'
// import { Provider } from 'react-redux'
// import { BrowserRouter, Route } from 'react-router-dom'
// import { Dashboard, Login, Views } from './components/index'
// import { store, history } from './store'
import Web3 from 'web3'
import { web3Provider } from '../app.config'


window.addEventListener('load', () => {
  if (typeof window.web3 !== 'undefined') {
    window.web3 = new Web3(window.web3.currentProvider)
  } else {
    window.web3 = new Web3(new Web3.providers.HttpProvider(web3Provider))
  }

  ReactDOM.render(
    <div>
      <p>Hello, Kelsey! :) Let's try this again</p>
    </div>, document.getElementById('app')
  )


  // ReactDOM.render(
  //   <BrowserRouter history={history}>
  //     <Provider store={store}>
  //         <div>
  //           <Route exact path="/" component={Views['Welcome']}/>
  //           <Route exact path="/dashboard" component={Dashboard}/>
  //         </div>
  //     </Provider>
  //   </BrowserRouter>,
  //   document.getElementById('app')
  // )
})
