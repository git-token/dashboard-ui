import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import {
  Row, Col
} from 'react-bootstrap'

import { checkEthereumAddress } from '../../actions/DashboardActions'

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
    dispatch(checkEthereumAddress())
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
          <Col sm={12}>
            <div style={{ paddingLeft: '25px', paddingRight: '25px' }}>
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
