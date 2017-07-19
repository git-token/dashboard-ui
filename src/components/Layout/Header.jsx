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

  toggleSideNav() {
    const { dispatch, dashboard: { gittoken: { showSideNav } } } = this.props
    dispatch({
      type: 'SET_GITTOKEN_DETAILS',
      id: 'showSideNav',
      value: !showSideNav
    })
  }

  render() {
    const { dispatch, dashboard: { github, gittoken } } = this.props
    const { name, symbol, organization, contributorAddress } = gittoken
    const { profile: { username } } = github

    return (
      <Row>
        <Col sm={8}>
          <div style={{ marginLeft: '25px'}}>
            <h1> <a href="#" onClick={this.toggleSideNav.bind(this)}>{name}</a>
          <small> | <a href="#"><img src={`https://img.shields.io/badge/Token-${symbol}-brightgreen.svg`}/></a>  <a href={`https://github.com/${organization}`} target="_blank" ><img src="https://img.shields.io/badge/Status-ALPHA-orange.svg"/></a> <a href="#"><img src={`https://img.shields.io/badge/${symbol}/ETH-0.00-red.svg`}/></a></small>
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
