import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Row, Col, Table
} from 'react-bootstrap'


class TokenDetailsTableComponent extends Component {
  constructor(opts) {
    super(opts)
  }

  componentDidMount() {
    const { dispatch } = this.props
  }

  render() {
    const { dashboard: { data: { summaryStatistics }, gittoken: { decimals } } } = this.props
    const {
      githubOrganization,
      contractAddress,
      tokenName,
      tokenSymbol,
      latestContribution,
      tokenSupply,
      reservedSupply,
      percentReserved,
      tokenInflation,
      totalContributions,
      uniqueContributions
    } = summaryStatistics

    const daysSinceContribution = Number(
      (new Date().getTime() - new Date(latestContribution * 1000).getTime())  / (864e5)
    ).toLocaleString()

    return (
      <div >
        <div style={{ textAlign: 'keft', marginBottom: '10px' }}>
          <h3>Token Details</h3>
        </div>
        <div style={{ height: '400px', overflow: 'scroll' }} >
          <Table responsive hover  >
            <tbody>
              <tr >
                <td>Contract Address</td>
                <td>{contractAddress}</td>
              </tr>
              <tr >
                <td>GitHub Organization</td>
              <td><a href={`https://github.com/${githubOrganization}`} target={"_blank"}>{githubOrganization}</a></td>
              </tr>
              <tr >
                <td>Token Name</td>
              <td>{tokenName}</td>
              </tr>
              <tr >
                <td>Token Symbol</td>
              <td>{tokenSymbol}</td>
              </tr>
              <tr >
                <td>Total Contributions</td>
                <td>{totalContributions}</td>
              </tr>
              <tr >
                <td>Token Supply</td>
                <td>{Number(tokenSupply / Math.pow(10, decimals)).toLocaleString()}</td>
              </tr>
              <tr >
                <td>Reserved Supply</td>
                <td>{Number(reservedSupply / Math.pow(10, decimals)).toLocaleString()} <small>| Token supply held by the contract for auction</small></td>
              </tr>
              <tr >
                <td>Percent Reserved for Auction</td>
                <td>{Number((reservedSupply / tokenSupply) * 100).toLocaleString()} %</td>
              </tr>
              <tr >
                <td>Days Since Last Contribution</td>
                <td>{daysSinceContribution} days</td>
              </tr>
              <tr >
                <td>Token Inflation Rate</td>
                <td>{tokenInflation}</td>
              </tr>
              <tr >
                <td>Unique Contributors</td>
                <td>{uniqueContributions}</td>
              </tr>
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

const TokenDetailsTable = connect(mapStoreToProps)(TokenDetailsTableComponent)

export default TokenDetailsTable
