import React, { Component } from 'react'
import { connect } from 'react-redux'
import { VictoryLabel, VictoryChart, VictoryAxis, VictoryLine, VictoryTheme } from 'victory'


class TokenDistributionsChartComponent extends Component {
  constructor(opts) {
    super(opts)
  }

  componentDidMount() {
    const { dispatch } = this.props
  }

  distributions ({ totalSupply }) {
    let { dashboard: { gittoken: { tokenDetails: { decimals } } } } = this.props

    return totalSupply.filter((s, i) => {
      if (s) {
        return true
      }
    }).map((s, i) => {
      return {
        x: new Date(+s.date * 1000).getTime(),
        y: Number(s.totalSupply / Math.pow(10, decimals))
      }
    })

  }

  render() {
    const { dashboard: { data: { totalSupply, summaryStatistics }, gittoken: { tokenDetails: { decimals, symbol } } } } = this.props
    const { tokenSupply } = summaryStatistics

    return (
      <div style={{ marginTop: '25px' }}>
        <div style={{ textAlign: 'left' }}>
          <h3>{`Total Token Supply | ${Number(tokenSupply / Math.pow(10, decimals)).toLocaleString()} ${symbol}`}</h3>
        </div>
        <VictoryChart
          scale={{x: "time"}}
          theme={VictoryTheme.material}
          width={600}
          height={300}
          responsive={true}
          padding={{ left: 60, bottom: 50, right: 50, top: 50 }}
        >
          <VictoryLine
            style={{
              data: { stroke: "tomato" },
              parent: { border: "1px solid #ccc"}
            }}
            data={this.distributions({ totalSupply })}
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

const TokenDistributionsChart = connect(mapStoreToProps)(TokenDistributionsChartComponent)

export default TokenDistributionsChart
