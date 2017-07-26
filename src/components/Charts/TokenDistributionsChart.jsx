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

  parseContributions () {
    let { dashboard: { data: { totalSupply }, gittoken: { decimals } } } = this.props
    if (totalSupply.length) {
      return totalSupply.map((s, i) => {
        console.log('s', s)
        return {
          x: new Date(+s.date * 1000).getTime(),
          y: Number(s.totalSupply / Math.pow(10, decimals))
        }
        // if (i < totalSupply.length - 1) {
        //   return {
        //     x: new Date(+s.date * 1000).getTime(),
        //     y: Number(s.totalSupply / Math.pow(10, decimals))
        //   }
        // } else {
        //   return {
        //     x: new Date(+s.date * 1000).getTime(),
        //     y: Number(totalSupply.pop().totalSupply / Math.pow(10, decimals))
        //   }
        // }
      })
    }
  }

  render() {
    const { dashboard: { data: { summaryStatistics }, gittoken: { decimals } } } = this.props
    const { tokenSupply, tokenSymbol } = summaryStatistics
    const data = this.parseContributions()

    return (
      <div style={{ marginTop: '25px' }}>
        <div style={{ textAlign: 'left' }}>
          <h3>{`Total Token Supply | ${Number(tokenSupply / Math.pow(10, decimals)).toLocaleString()} ${tokenSymbol}`}</h3>
        </div>
        <VictoryChart
          scale={{x: "time"}}
          theme={VictoryTheme.material}
          width={600}
          height={200}
          responsive={true}
          padding={{ left: 60, top: 20, bottom: 50, right: 60 }}
        >
          <VictoryLine
            style={{
              data: { stroke: "tomato" },
              parent: { border: "1px solid #ccc"}
            }}
            data={data}
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
