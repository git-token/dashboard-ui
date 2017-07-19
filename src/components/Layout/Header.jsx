import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import {
  Row, Col
} from 'react-bootstrap'

class HeaderComponent extends Component {
  constructor(opts) {
    super(opts)
  }

  render() {
    const { dispatch, dashboard: { github, gittoken } } = this.props
    const { name, symbol, organization, contributorAddress } = gittoken
    const { profile: { username } } = github

    return (
      <Row>
        <Col sm={8}>
          <div style={{ marginLeft: '25px'}}>
            <h1>{name}
              <small> | <a href="#"><img src={`https://img.shields.io/badge/Trade-${symbol}-brightgreen.svg`}/></a>  <a href={`https://github.com/${organization}`} target="_blank" ><img src="https://img.shields.io/badge/Status-ALPHA-orange.svg"/></a></small>
            </h1>
          </div>
        </Col>
        <Col sm={4}>
          <div style={{ marginTop: '10px' }}>
            <small>Logged In as {username} | {contributorAddress}</small>
          </div>
        </Col>
      </Row>
    )
  }

}

const mapStoreToProps = (store, props) => {
  return {
    dashboard: store.dashboard
  }
}

const Header = connect(mapStoreToProps)(HeaderComponent)

export default Header
