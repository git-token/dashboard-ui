import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import {
  Row, Col
} from 'react-bootstrap'

class FooterComponent extends Component {
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
          <div style={{ marginTop: "20px", textAlign: 'center' }}>
            <h3>Powered By<img src="./src/assets/images/GitTokenLogo.png" style={{ marginLeft: "-10px", height: "72px" }} /></h3>
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

const Footer = connect(mapStoreToProps)(FooterComponent)

export default Footer
