import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import {
  Row, Col, Panel, Table, ProgressBar
} from 'react-bootstrap'

import {
  AuctionBidForm
} from '../Forms/index'

class CurrentAuctionComponent extends Component {
  constructor(opts) {
    super(opts)
  }


  render() {
    const { dispatch, dashboard: { gittoken: { tokenDetails }, data: { countdown, currentAuction } } } = this.props

    return (
      <Row>
        <Col sm={4}>
          <AuctionBidForm />
        </Col>
        <Col sm={8}>
          
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

const CurrentAuction = connect(mapStoreToProps)(CurrentAuctionComponent)

export default CurrentAuction
