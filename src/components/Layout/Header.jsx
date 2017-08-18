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

  logoAction() {
    const { dispatch, dashboard: { gittoken: { showSideNav } } } = this.props
    // dispatch({
    //   type: 'SET_GITTOKEN_DETAILS',
    //   id: 'showSideNav',
    //   value: !showSideNav
    // })
    alert('Hello :)')
  }

  render() {
    const { dispatch, dashboard: { data: { summaryStatistics }, github, gittoken } } = this.props
    const { tokenName, tokenSymbol, githubOrganization } = summaryStatistics
    const { contributorAddress } = gittoken
    const { profile: { username } } = github

    return (
      <Row>
        <Col sm={12}>
          <div style={{ marginLeft: '25px'}}>
            <a href="https://github.com/git-token" target="_blank"><img style={{
                position: "absolute", top: 0, right: 0, border: 0

              }} src="https://camo.githubusercontent.com/652c5b9acfaddf3a9c326fa6bde407b87f7be0f4/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f6f72616e67655f6666373630302e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_orange_ff7600.png"/>
            </a>
            <h1 style={{fontSize: '72px'}}> <a href="#" onClick={this.logoAction.bind(this)}>{tokenName}</a>
            <small> | <a href="#"><img src={`https://img.shields.io/badge/Token-${tokenSymbol}-brightgreen.svg`}/></a>  <a href={`https://github.com/${githubOrganization}`} target="_blank" ><img src="https://img.shields.io/badge/Status-ALPHA-orange.svg"/></a> <a href="#"><img src={`https://img.shields.io/badge/${tokenSymbol}/ETH-0.00-red.svg`}/></a></small>
            </h1>
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
