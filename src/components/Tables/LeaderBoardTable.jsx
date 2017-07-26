import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Row, Col, Table
} from 'react-bootstrap'


class LeaderBoardTableComponent extends Component {
  constructor(opts) {
    super(opts)
  }

  componentDidMount() {
    const { dispatch } = this.props
  }

  leaderBoard () {
    const { dashboard: { data: { leaderboard }, gittoken: { decimals, symbol } } } = this.props

    return leaderboard.map((ranking, i) => {
      const { username, contributorAddress, value, latestContribution, numContributions, valuePerContribution } = ranking;
      return (
        <tr key={i}>
          <td>{username}</td>
          <td>{Number(value / Math.pow(10, decimals)).toLocaleString()} {symbol}</td>
          <td>{numContributions}</td>
          <td>{Number(valuePerContribution / Math.pow(10, decimals)).toLocaleString()}</td>
        </tr>
      )
    })
  }

  render() {
    const { dashboard: { gittoken } } = this.props


    return (
      <div >
        <div style={{ textAlign: 'left', marginBottom: '10px' }}>
          <h3>Leader Board</h3>
        </div>
        <div style={{ height: '200px', overflow: 'scroll' }} >
          <Table responsive hover  >
            <thead>
              <tr>
                <th>Contributor</th>
                <th># of Tokens Created</th>
                <th># of Contributions</th>
                <th>Tokens / Contributions</th>
              </tr>
            </thead>
            <tbody>
              {this.leaderBoard()}
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

const LeaderBoardTable = connect(mapStoreToProps)(LeaderBoardTableComponent)

export default LeaderBoardTable
