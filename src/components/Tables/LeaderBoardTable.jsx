import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Row, Col, Table
} from 'react-bootstrap'
import { timeAgo } from '../../actions/DashboardActions'


class LeaderBoardTableComponent extends Component {
  constructor(opts) {
    super(opts)
  }

  componentDidMount() {
    const { dispatch } = this.props
  }

  leaderBoard () {
    const { dashboard: { data: { leaderboard, summaryStatistics: { tokenSupply, totalContributions } }, gittoken: { tokenDetails: { decimals, symbol } } } } = this.props

    return Object.keys(leaderboard).sort((a, b) => {
      return leaderboard[b].numContributions - leaderboard[a].numContributions
    }).map((user, i) => {
      const {
        username,
        contributorAddress,
        value,
        latestContribution,
        numContributions,
        valuePerContribution,
        percentTokenCreation
      } = leaderboard[user];

      return (
        <tr key={i}>
          <td>{username}</td>
          <td>{Number(value / Math.pow(10, decimals)).toLocaleString()} {symbol}</td>
          <td>{numContributions}</td>
          <td>{Number((numContributions / totalContributions) * (value / tokenSupply) * 100).toLocaleString()} %</td>
          <td>{Number((value / tokenSupply ) * 100).toLocaleString()} %</td>
        <td>{timeAgo({ date: latestContribution })}</td>
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
        <div style={{ overflow: 'scroll' }} >
          <Table responsive hover striped >
            <thead>
              <tr>
                <th>Contributor</th>
                <th># of Tokens Created</th>
                <th># of GitHub Contributions</th>
                <th>Percent (%) of Tokens Contributed To</th>
                <th>Percent (%) of Tokens Created</th>
                <th>Time Since Last Contribution</th>
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
