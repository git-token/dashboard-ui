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
  }

  render() {
    const { dashboard } = this.props

    return (
      <div>
        <div style={{ background: 'linear-gradient(45deg, #0c0019, #493f5b)', height: '400px' }}>
  				<Row>
  					<Col sm={12}>
              <SideNav />
  						<Header />
  					</Col>
  				</Row>
        </div>
        <div style={{ background: 'linear-gradient(-225deg, #0c0019, #493f5b)', height: '400px' }}>
          <Row>
  					<Col sm={12}>
              <div style={{  }}>
                <p>Testing</p>
              </div>
  					</Col>
  				</Row>
  			</div>
        <div style={{ background: 'linear-gradient(45deg, #0c0019, #493f5b)', height: '400px' }}>
          <Row>
  					<Col sm={12}>
              <div style={{  }}>
                <p>Testing</p>
              </div>
  					</Col>
  				</Row>
  			</div>
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
