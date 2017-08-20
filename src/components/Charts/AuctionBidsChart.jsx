import React, { Component } from 'react'
import { connect } from 'react-redux'
import { VictoryLabel, VictoryChart, VictoryAxis, VictoryLine, VictoryTheme } from 'victory'


class AuctionBidsChartComponent extends Component {
  constructor(opts) {
    super(opts)
  }

  bids ({ auctionBids }) {
    let { dashboard: { gittoken: { tokenDetails: { decimals } } } } = this.props

    return auctionBids.filter((bid, i) => {
      if (bid) {
        return true
      }
    }).map((bid, i) => {
      return {
        x: new Date(+bid.date * 1000).getTime(),
        y: (1 / Number(bid.wtdAvgExRate)) * Math.pow(10, decimals)
      }
    })

  }


  render() {
    const { dashboard: { gittoken, data: { auctionBids, currentAuction: { auctionRound } } } } = this.props
    const { tokenDetails: { symbol } } = gittoken


    return (
      <div style={{ marginTop: '25px', margin: 'auto' }}>
        <div style={{ textAlign: 'left' }}>
          <h3>Auction {auctionRound} | Weighted Average Exchange Rate {symbol} / ETH</h3>
        </div>
        <VictoryChart
          scale={{x: "time"}}
          theme={VictoryTheme.material}
          width={500}
          height={200}
          responsive={true}
          padding={{ left: 100, bottom: 50, right: 50, top: 50 }}
        >
          <VictoryLine
            style={{
              data: { stroke: "tomato" },
              parent: { border: "1px solid #ccc"}
            }}
            data={auctionBids ? this.bids({ auctionBids }) : []}
          />
        </VictoryChart>
      </div>
    )
  }

}

const mapStoreToProps = (store, props) => {
  return {
    dashboard: store.dashboard
  }
}

const AuctionBidsChart = connect(mapStoreToProps)(AuctionBidsChartComponent)

export default AuctionBidsChart
