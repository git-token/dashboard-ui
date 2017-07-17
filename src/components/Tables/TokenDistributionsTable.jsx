import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Row, Col, Table
} from 'react-bootstrap'


class TokenDistributionsTableComponent extends Component {
  constructor(opts) {
    super(opts)
  }

  componentDidMount() {
    const { dispatch } = this.props
  }

  contributionHistory () {
    const { dashboard: { gittoken: { contributions, decimals } } } = this.props
    const events = Object.keys(contributions)

    let initValue = 0

    if (events.length) {
      return events.sort((a, b) => {
        const d1 = new Date(contributions[a]['args']['date'].toNumber())
        const d2 = new Date(contributions[b]['args']['date'].toNumber())
        return d2 - d1
      }).map((e, i) => {
        const { args: { contributor, date, value, rewardType } } = contributions[e]
        return (
          <tr key={i}>
            <td>{contributor}</td>
            <td>{rewardType}</td>
            <td>{value.toNumber() / Math.pow(10, decimals)}</td>
            <td>{new Date(date.toNumber() * 1000).toString()}</td>
          </tr>
        )
      })
    }
  }

  render() {
    const { dashboard: { gittoken } } = this.props

    return (
      <div style={{ height: '600px' }}>
        <div style={{ textAlign: 'center', marginBottom: '10px' }}>
          <h3>Contribution History</h3>
        </div>
        <Table responsive hover>
          <thead>
            <tr>
              <th>Contributor</th>
              <th>Contribution Type</th>
              <th># of Tokens Distributed</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {this.contributionHistory()}
          </tbody>
        </Table>
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
