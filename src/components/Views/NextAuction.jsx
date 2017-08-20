import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Row, Col, Panel, Table, ProgressBar
} from 'react-bootstrap'

import {
  AuctionBidForm
} from '../Forms/index'

import CurrentAuction from './CurrentAuction.jsx'

class NextAuctionComponent extends Component {
  constructor(opts) {
    super(opts)
  }


  render() {
    const { dispatch, dashboard: { gittoken: { tokenDetails }, data: { countdown, nextAuction } } } = this.props
    console.log('coundown', countdown)
    console.log('countdown.length', countdown.length);
    if (countdown.length == 0) {
      return (<CurrentAuction />)
    } else {
      return (
        <div >
          <Row>
            <Col sm={12}>
                <div style={{ marginTop: '50px', textAlign: 'center' }}>
                  <h1>Next Auction Starts in </h1>
                  <h3>{countdown}</h3>
                </div>
            </Col>
          </Row>
          <br/>
          <Row>
            <Col sm={4}></Col>
            <Col sm={4}>
              <Table hover responsive striped>
                <tbody>
                  <tr>
                    <td>Auction Round</td>
                    <td>{nextAuction['auctionRound']}</td>
                  </tr>
                  <tr>
                    <td>Initial Exchange Rate</td>
                    <td>{nextAuction['initialPrice'].toLocaleString()} {tokenDetails['symbol']} / ETH</td>
                  </tr>
                  <tr>
                    <td>Funding Limit</td>
                    <td>{nextAuction['fundLimit'].toLocaleString()} ETH</td>
                  </tr>
                  <tr>
                    <td>Tokens Offered</td>
                    <td>{nextAuction['tokensOffered'].toLocaleString()} {tokenDetails['symbol']} </td>
                  </tr>
                  <tr>
                    <td>Start Date</td>
                    <td>{new Date(nextAuction['startDate'] * 1000).toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td>End Date</td>
                    <td>{new Date(nextAuction['endDate'] * 1000).toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td>Tokens Locked Until Date</td>
                    <td>{new Date(nextAuction['lockDate'] * 1000).toLocaleString()}</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
            <Col sm={4}></Col>
          </Row>
        </div>
      )
    }

  }

}

const mapStoreToProps = (store, props) => {
  return {
    dashboard: store.dashboard
  }
}

const NextAuction = connect(mapStoreToProps)(NextAuctionComponent)

export default NextAuction
