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
    const { dispatch, dashboard: { data: { summaryStatistics }, github, gittoken } } = this.props
    const { tokenName, tokenSymbol, githubOrganization } = summaryStatistics
    const { contributorAddress } = gittoken
    const { profile: { username } } = github

    return (
      <Row>
        <Col sm={8}>
          <div style={{ marginLeft: '25px'}}>
            <h1> <a href="#" onClick={this.toggleSideNav.bind(this)}>{tokenName}</a>
          <small> | <a href="#"><img src={`https://img.shields.io/badge/Token-${tokenSymbol}-brightgreen.svg`}/></a>  <a href={`https://github.com/${githubOrganization}`} target="_blank" ><img src="https://img.shields.io/badge/Status-ALPHA-orange.svg"/></a> <a href="#"><img src={`https://img.shields.io/badge/${tokenSymbol}/ETH-0.00-red.svg`}/></a></small>
            </h1>
          </div>
        </Col>
        <Col sm={4}>
          { username && contributorAddress ?
            <div style={{ marginTop: '10px' }}>
              <small>Logged In as {username} | {contributorAddress}</small>
            </div> :
            null
          }
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
