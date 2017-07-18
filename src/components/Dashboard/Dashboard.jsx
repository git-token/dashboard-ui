import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import {
  Row, Col
} from 'react-bootstrap'
import { ConnectToWebSocket, authenticateGitHubUser } from '../../actions/DashboardActions'

import { TokenDistributionsChart } from '../Charts/index'
import { TokenDistributionsTable } from '../Tables/index'

class DashboardComponent extends Component {
  constructor(opts) {
    super(opts)
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(Web3Loaded())
  }

  componentDidUpdate() {
    const { dispatch, gittoken: { web3Provider } } = this.props
    if (web3Provider) {
      dispatch(authenticateGitHubUser())
      dispatch(ConnectToWebSocket())
    }
  }

  render() {

    return (
      <div>
        <Row>
          <Col sm={2}>
            {/*<Route exact path="/" component={Charts['TokenDistributionsChart']}/>*/}
          </Col>
          <Col sm={4}>
            {/*<Route exact path="/" component={Charts['TokenDistributionsChart']}/>*/}
          </Col>
          <Col sm={6}>
            <TokenDistributionsChart />
            <TokenDistributionsTable />
          </Col>
        </Row>
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
