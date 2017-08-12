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
            <a href="https://GitToken.org" target="_blank">
            <svg height="144" viewBox="0 0 400 400">
              <path d="M 250 200 L 350 150 L 350 250 L 250 300 L 150 250 L 150 150 Q 250 100 250 100 L 250 100 L 315 135 "
                fill="transparent"
                strokeLinejoin={"round"}
                stroke="#ff6a00"
                strokeWidth="12"
              />


              <circle cx="315" cy="135" r="14" fill="#ff6a00"/>
              <circle cx="315" cy="135" r="8" fill="white"/>
              <circle cx="250" cy="200" r="14" fill="#ff6a00"/>
              <circle cx="250" cy="200" r="8" fill="white"/>
            </svg>
            </a>
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
