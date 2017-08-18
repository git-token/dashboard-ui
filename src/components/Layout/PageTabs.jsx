import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import {
  Tabs, Tab, Row, Col
} from 'react-bootstrap'

import { ConnectToWebSocket, authenticateGitHubUser, loadWeb3 } from '../../actions/DashboardActions'

import {
  TokenStatistics,
  ProjectMilestones,
  TokenAuction
} from '../Views/index'

import {
  TokenDistributionsChart,
  TokenInflationChart,
  GitContributionFrequencyChart,
  TokensVsContributionsScatterChart,
  UserTokenCreationChart
} from '../Charts/index'

import {
  TokenDistributionsTable,
  LeaderBoardTable,
  TokenDetailsTable
} from '../Tables/index'

import {
  TermsOfServiceModal
} from '../Modals/index'

class PageTabsComponent extends Component {
  constructor(opts) {
    super(opts)
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(loadWeb3())
  }

  renderTabs() {
    const { dashboard: { views: { options } } } = this.props

    return options.map((option, i) => {
      return (
        <Tab key={i} eventKey={option} title={option}>
          {option} Content Here!
        </Tab>
      )
    })
  }

  selectPage(id) {
    const { dispatch } = this.props
    dispatch({ type: 'UPDATE_VIEWS_DATA', id: 'activeView', value: id })
  }

  render() {
    const { dashboard: { views: { activeView, options } } } = this.props
    return (
      <div>
        <Tabs activeKey={activeView} onSelect={this.selectPage.bind(this)} id="page-tabs">
          <Tab eventKey={"Token Details"} title={"Token Details"}>
            <TokenDetailsTable />
          </Tab>
          <Tab eventKey={"Contribution History"} title={"Contribution History"}>
            <Row>
              <Col sm={6}>
                <TokenDistributionsChart />
              </Col>
              <Col sm={6}>
                <TokenInflationChart />
              </Col>
            </Row>
            <TokenDistributionsTable />
          </Tab>
          <Tab eventKey={"Leader Board"} title={"Leader Board"}>
            <Row>
              <Col sm={6}>
                <TokensVsContributionsScatterChart />
              </Col>
              <Col sm={6}>
                <UserTokenCreationChart />
              </Col>
            </Row>
            <LeaderBoardTable />
          </Tab>
          <Tab eventKey={"Project Milestones"} title={"Project Milestones"}>
            <ProjectMilestones />
          </Tab>
          <Tab eventKey={"Token Auction"} title={"Token Auction"}>
            <TokenAuction />
          </Tab>
        </Tabs>
        <TermsOfServiceModal />
      </div>
    )
  }

}

const mapStoreToProps = (store, props) => {
  return {
    dashboard: store.dashboard
  }
}

const PageTabs = connect(mapStoreToProps)(PageTabsComponent)

export default PageTabs
