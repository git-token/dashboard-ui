import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import {
  Row, Col, Panel, Table, ProgressBar
} from 'react-bootstrap'

class PastAuctionsComponent extends Component {
  constructor(opts) {
    super(opts)
  }

  auctionHistory({ auctionHistory }) {
    const { dashboard: { gittoken: { tokenDetails: { decimals, symbol } } } } = this.props
    return auctionHistory.sort((a, b) => {
      return a.auctionRound - b.auctionRound;
    }).map((auction, i) => {
      const {
        auctionRound,
        startDate,
        endDate,
        lockDate,
        initialExRate,
        wtdAvgExRate,
        tokensOffered,
        tokensTransferred,
        fundsCollected,
        fundLimit
      } = auction

      return (
        <tr key={i}>
          <td>{auctionRound}</td>
          <td>{new Date(startDate * 1000).toLocaleString()}</td>
          <td>{new Date(endDate * 1000).toLocaleString()}</td>
          <td>{new Date(lockDate * 1000).toLocaleString()}</td>
          <td>{Number(initialExRate).toLocaleString()} ETH/{symbol}</td>
          <td>{Number(wtdAvgExRate / Math.pow(10, decimals)).toLocaleString()} ETH/{symbol}</td>
          <td>{Number(tokensOffered).toLocaleString()} {symbol}</td>
          <td>{Number(tokensTransferred / Math.pow(10, decimals)).toLocaleString()} {symbol}</td>
          <td>{Number(fundsCollected).toLocaleString()} ETH</td>
          <td>{Number(fundLimit).toLocaleString()} ETH</td>
        </tr>
      );
    })
  }

  render() {
    const { dispatch, dashboard: { gittoken: { tokenDetails }, data: { auctionHistory } } } = this.props

    if (!auctionHistory || auctionHistory.length == 0) {
      return (
        <div style={{ textAlign: 'center'}}>
          <h3>No Auction History</h3>
        </div>
      )
    } else {
      return (
        <div >
          <Row>
            <Col sm={12}>
                <div style={{ marginTop: '50px', textAlign: 'center' }}>
                  <h1>Auction History</h1>
                  <br/>
                  <Table responsive striped hover>
                    <thead>
                      <tr>
                        <th>Auction Round</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Lock Tokens Until Date</th>
                        <th>Initial Exchange Rate</th>
                        <th>Weighted Average Exchange Rate</th>
                        <th>Tokens Offered</th>
                        <th>Tokens Transferred</th>
                        <th>Funds Received</th>
                        <th>Fund Limit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.auctionHistory({ auctionHistory })}
                    </tbody>
                  </Table>
                </div>
            </Col>
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

const PastAuctions = connect(mapStoreToProps)(PastAuctionsComponent)

export default PastAuctions
