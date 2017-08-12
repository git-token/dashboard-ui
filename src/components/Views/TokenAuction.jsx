import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import {
  Row, Col, Panel, Table, ProgressBar
} from 'react-bootstrap'


class TokenAuctionComponent extends Component {
  constructor(opts) {
    super(opts)
  }

  render() {
    const { dispatch, dashboard: { gittoken: { timeUntilNextAuction } } } = this.props

    return (
      <div style={{ marginTop: "50px"}}>
        <Row>
          <Col sm={12}>
            <p>Days Remaining</p>
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

const TokenAuction = connect(mapStoreToProps)(TokenAuctionComponent)

export default TokenAuction
