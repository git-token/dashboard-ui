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
    const { name, symbol, organization } = gittoken
    const { profile: { username } } = github

    return (
      <Row>
        <Col sm={9}>
          <h1>{name}
            <small> | {symbol} |
              <a href={`https://github.com/${organization}`} target="_blank" ><img src="https://img.shields.io/badge/GitHub-Active-orange.svg"/></a>
            </small>
          </h1>
        </Col>
        <Col sm={3}>
          <small>Logged In as {username}</small>
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
