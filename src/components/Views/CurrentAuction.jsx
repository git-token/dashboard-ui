import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import countdown from 'countdown'
import {
  Row, Col, Panel, Table, ProgressBar
} from 'react-bootstrap'

import {
  AuctionBidForm
} from '../Forms/index'

import {
  AuctionBidsChart
} from '../Charts/index'

class CurrentAuctionComponent extends Component {
  constructor(opts) {
    super(opts)
  }

  auctionDetails() {
    const { dashboard: { gittoken: { tokenDetails }, data: { currentAuction } } } = this.props
    return (
      <div>
        <h3>Auction Details</h3>
        <hr/>
        <Table hover responsive striped>
          <tbody>
            <tr>
              <td>Auction Round</td>
              <td>{currentAuction['auctionRound']}</td>
            </tr>
            <tr>
              <td>Initial Exchange Rate</td>
              <td>{currentAuction['initialPrice'].toLocaleString()} {tokenDetails['symbol']} / ETH</td>
            </tr>
            <tr>
              <td>Funding Limit</td>
              <td>{currentAuction['fundLimit'].toLocaleString()} ETH</td>
            </tr>
            <tr>
              <td>Tokens Offered</td>
              <td>{currentAuction['tokensOffered'].toLocaleString()} {tokenDetails['symbol']} </td>
            </tr>
            <tr>
              <td>Start Date</td>
              <td>{new Date(currentAuction['startDate'] * 1000).toLocaleString()}</td>
            </tr>
            <tr>
              <td>End Date</td>
              <td>{new Date(currentAuction['endDate'] * 1000).toLocaleString()}</td>
            </tr>
            <tr>
              <td>Tokens Locked Until Date</td>
              <td>{new Date(currentAuction['lockDate'] * 1000).toLocaleString()}</td>
            </tr>
          </tbody>
        </Table>
      </div>
    )
  }

  render() {
    const { dispatch, dashboard: { gittoken: { tokenDetails }, data: { currentAuction } } } = this.props

    const timeRemaining = countdown(new Date(currentAuction['endDate'] * 1000))

    return (
      <div>
        <Row>
          <Col sm={12}>
            <AuctionBidsChart />
          </Col>
        </Row>
        <Row>
          <Col sm={8}>
            {this.auctionDetails()}
          </Col>
          <Col sm={4}>
            <AuctionBidForm />
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

const CurrentAuction = connect(mapStoreToProps)(CurrentAuctionComponent)

export default CurrentAuction
