import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Row, Col, Table
} from 'react-bootstrap'
import { timeAgo } from '../../actions/DashboardActions'

class TokenDistributionsTableComponent extends Component {
  constructor(opts) {
    super(opts)
  }

  componentDidMount() {
    const { dispatch } = this.props
  }

  contributionHistory () {
    const { dashboard: { data: { contributionHistory }, gittoken: { tokenDetails: { decimals, symbol } } } } = this.props

    return contributionHistory.sort((a, b) => {
      return b.date - a.date
    }).map((contribution, i) => {
      const { username, rewardType, value, reservedValue, date } = contribution
      return (
        <tr key={i}>
          <td>{username}</td>
          <td>{rewardType}</td>
          <td>{Number(value / Math.pow(10, decimals)).toLocaleString()} {symbol}</td>
          <td>{reservedValue > 0 ? Number(reservedValue / Math.pow(10, decimals)).toLocaleString() : 0} {symbol}</td>
        <td>{Number((+value + +reservedValue) / Math.pow(10, decimals)).toLocaleString()} {symbol}</td>
          <td>{timeAgo({ date })}</td>
        </tr>
      )
    })
  }

  render() {
    return (
      <div>
        <div style={{ textAlign: 'left', marginBottom: '10px' }}>
          <h3>Contribution History</h3>
        </div>
        <div style={{ height: 400, overflow: 'scroll' }} >
          <Table responsive hover  >
            <thead>
              <tr>
                <th>Contributor</th>
                <th>Contribution Type</th>
                <th>Total # of Tokens Distributed</th>
                <th>Total # of Tokens Reserved</th>
                <th>Total # of Tokens Created</th>
                <th>Time Since Contribution</th>
              </tr>
            </thead>
            <tbody>
              {this.contributionHistory()}
            </tbody>
          </Table>
        </div>
      </div>
    )
  }

}

const mapStoreToProps = (store, props) => {
  return {
    dashboard: store.dashboard
  }
}

const TokenDistributionsTable = connect(mapStoreToProps)(TokenDistributionsTableComponent)

export default TokenDistributionsTable
