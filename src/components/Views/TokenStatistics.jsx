import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import {
  Row, Col
} from 'react-bootstrap'
import { ConnectToWebSocket, authenticateGitHubUser, loadWeb3 } from '../../actions/DashboardActions'

import {
  TokenDistributionsChart,
  TokenInflationChart,
  GitContributionFrequencyChart,
  TokensVsContributionsScatterChart
} from '../Charts/index'
import {
  TokenDistributionsTable,
  LeaderBoardTable,
  TokenDetailsTable
} from '../Tables/index'
import {
  Header,
  SideNav,
  Message,
  PageTabs
} from '../Layout/index'

class TokenStatisticsComponent extends Component {
  constructor(opts) {
    super(opts)
  }

  componentDidMount() {
    const { dispatch } = this.props
  }

  render() {
    const { dispatch, dashboard: { gittoken: { showSideNav } } } = this.props

    return (
      <div>
        <Row>
          <Col sm={12}>
            <Col sm={4}>
              <TokenDetailsTable />
              <LeaderBoardTable />
              <TokenDistributionsTable />
            </Col>
            <Col sm={8}>
              <Row>
                <Col sm={6}>
                  <TokenDistributionsChart />
                </Col>
                <Col sm={6}>
                  <TokenInflationChart />
                </Col>
              </Row>
              <Row>
                <Col sm={6}>
                  <GitContributionFrequencyChart />
                </Col>
                <Col sm={6}>
                  <TokensVsContributionsScatterChart />
                </Col>
              </Row>
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

const TokenStatistics = connect(mapStoreToProps)(TokenStatisticsComponent)

export default TokenStatistics
