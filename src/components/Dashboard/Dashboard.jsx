import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import {
  Row, Col
} from 'react-bootstrap'
import { ConnectToWebSocket } from '../../actions/DashboardActions'
import { Charts } from '../index'

class DashboardComponent extends Component {
  constructor(opts) {
    super(opts)
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(ConnectToWebSocket())
  }

  render() {

    return (
      <div>
        <Row>
          <Col sm={4}>
            {/*<Route exact path="/" component={Charts['TokenDistributionsChart']}/>*/}
          </Col>
          <Col sm={8}>
            <Route exact path="/" component={Charts['TokenDistributionsChart']}/>
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
