import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'

import { DashboardActions } from '../../actions/index'
import { Charts } from '../index'

class DashboardComponent extends Component {
  constructor(opts) {
    super(opts)
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(DashboardActions.ConnectToWebSocket())
  }

  render() {

    return (
      <div>
        <p>Dashboard</p>
        <Route exact path="/" component={Charts['TokenDistributionsChart']}/>
      </div>
    )
  }

}

const mapStoreToProps = (store, props) => {
  return {
    dashboard: store.dashboard
  }
}

const Dashboard = connect(mapStoreToProps)(DashboardComponent)

export default Dashboard
