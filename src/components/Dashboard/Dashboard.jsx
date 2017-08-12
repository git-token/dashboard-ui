import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import {
  Row, Col
} from 'react-bootstrap'

import {
  Header,
  Footer,
  SideNav,
  Message,
  PageTabs
} from '../Layout/index'

class DashboardComponent extends Component {
  constructor(opts) {
    super(opts)
  }

  componentDidMount() {
    const { dispatch } = this.props
    // dispatch(loadWeb3())
  }

  render() {
    const { dispatch, dashboard: { gittoken: { showSideNav } } } = this.props

    return (
      <div>
        <Row>
          <Col sm={12}>
            <Message />
            <Header />
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <div style={{ paddingLeft: '15px', paddingRight: '15px' }}>
              <PageTabs />
            </div>
          </Col>
        </Row>
        <Footer />
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
