import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Row, Col, Table
} from 'react-bootstrap'
import { timeAgo } from '../../actions/DashboardActions'

class TokenDetailsTableComponent extends Component {
  constructor(opts) {
    super(opts)
  }

  componentDidMount() {
    const { dispatch } = this.props
  }

  render() {
    const { dashboard: { data: { summaryStatistics }, gittoken: { tokenDetails: { decimals, name, symbol, organization, address } } } } = this.props
    const {
      latestContribution,
      tokenSupply,
      reservedSupply,
      percentReserved,
      tokenInflation,
      totalContributions,
      uniqueContributions
    } = summaryStatistics

    return (
      <div >
        <div style={{ textAlign: 'keft', marginBottom: '10px' }}>
          <h3>Token Details</h3>
        </div>
        <Row>
          <Col sm={12}>
            <Table responsive hover  >
              <tbody>
                <tr >
                  <td>GitHub Organization</td>
                  <td><a href={`https://github.com/${organization}`} target={"_blank"}>{organization}</a></td>
                </tr>
                <tr >
                  <td>Contract Address</td>
                  <td>{address}</td>
                </tr>
                <tr >
                  <td>Reserved Supply</td>
                  <td>{Number(reservedSupply / Math.pow(10, decimals)).toLocaleString()} <small>| Token supply held by the contract for auction</small></td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          <Col sm={6}>
            <Table responsive hover  >
              <tbody>
                <tr >
                  <td>Token Name</td>
                <td>{name}</td>
                </tr>
                <tr >
                  <td>Token Symbol</td>
                <td>{symbol}</td>
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
                  <td>Time Since Last Contribution</td>
                  <td>{timeAgo({ date: latestContribution })}</td>
                </tr>
              </tbody>
            </Table>
          </Col>
          <Col sm={6}>
            <Table responsive hover  >
              <tbody>
                <tr >
                  <td>Unique Contributors</td>
                  <td>{uniqueContributions}</td>
                </tr>
                <tr >
                  <td>Percent of Tokens Reserved for Auction</td>
                  <td>{Number((reservedSupply / tokenSupply) * 100).toLocaleString()} %</td>
                </tr>
                <tr >
                  <td>Token Supply Inflation Rate % (Geometric Average)</td>
                  <td>{(+tokenInflation * 100).toLocaleString()} %</td>
                </tr>
              </tbody>
            </Table>
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

const TokenDetailsTable = connect(mapStoreToProps)(TokenDetailsTableComponent)

export default TokenDetailsTable
