import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import {
  Row, Col, Jumbotron
} from 'react-bootstrap'

class MessageComponent extends Component {
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
        <Col sm={12}>
          <Jumbotron>
            <a href="https://github.com/git-token" target="_blank"><img style={{
                position: "absolute", top: 0, right: 0, border: 0

              }} src="https://camo.githubusercontent.com/652c5b9acfaddf3a9c326fa6bde407b87f7be0f4/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f6f72616e67655f6666373630302e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_orange_ff7600.png"/>
            </a>
            <div style={{ marginLeft: '50px', marginRight: '50px' }}>
              <h3>
                GitToken is open source software for any GitHub organization to issue and distribute Ethereum tokens for git contributions.
              </h3>
              <h3>
                An alpha version of the GitToken software is powering this dashboard. To interact with the GitToken contract services, please download <a href="metamask.io" target="_blank">MetaMask</a> and set your RPC provider to <u>http://138.68.225.133:8545</u>.
              </h3>
              <h3>
                <strong>DISCLAIMER</strong>: The GitToken contracts and tokens are issued on a private Ethereum network for development and testing purposes only. Tokens issued on this network do not hold any value. This software is pre-release alphaware, and is not suitable for production environments in its current form.
              </h3>
            </div>
          </Jumbotron>
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

const Message = connect(mapStoreToProps)(MessageComponent)

export default Message
