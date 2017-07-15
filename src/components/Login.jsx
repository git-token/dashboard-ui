import React, { Component } from 'react'
import { connect } from 'react-redux'

class LoginComponent extends Component {
  constructor(opts) {
    super(opts)
  }

  render() {
    return (
      <p>Login</p>
    )
  }

}

const mapStoreToProps = (store, props) => {
  return {
    dashboard: store.dashboard
  }
}

const Login = connect(mapStoreToProps)(LoginComponent)

export default Login
