import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import {
  Row, Col
} from 'react-bootstrap'
import { ConnectToWebSocket, authenticateGitHubUser, loadWeb3 } from '../../actions/DashboardActions'

import {
  TokenDistributionsChart,
  GitContributionFrequencyChart
} from '../Charts/index'
import {
  TokenDistributionsTable,
  LeaderBoardTable
} from '../Tables/index'
import {
  Header,
  SideNav
} from '../Layout/index'

class DashboardComponent extends Component {
  constructor(opts) {
    super(opts)
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(loadWeb3())
  }

  render() {
    const { dispatch, dashboard: { gittoken: { showSideNav } } } = this.props

    return (
      <div>
        <Row>
          <Col sm={12}>
            <Header />
          </Col>
        </Row>
        <Row>
          { !showSideNav ? null :
            <Col sm={2}>
              <SideNav />
            </Col>
          }
          <Col sm={showSideNav ? 10 : 12}>
            <Col sm={4}>
              <LeaderBoardTable />
              <TokenDistributionsTable />
            </Col>
            <Col sm={8}>
              <TokenDistributionsChart />
              <GitContributionFrequencyChart />
            </Col>
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
