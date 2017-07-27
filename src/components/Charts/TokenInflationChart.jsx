import React, { Component } from 'react'
import { connect } from 'react-redux'
import { VictoryLabel, VictoryLegend, VictoryChart, VictoryGroup, VictoryAxis, VictoryLine, VictoryTheme } from 'victory'


class TokenInflationChartComponent extends Component {
  constructor(opts) {
    super(opts)
  }

  componentDidMount() {
    const { dispatch } = this.props
  }

  inflationData ({ tokenInflation, avg }) {
    // console.log('tokenInflation', tokenInflation)
    if (tokenInflation.length) {
      return tokenInflation.filter((s, i) => {
        if (s) {
          return true
        }
      }).map((s, i) => {
        return {
          x: new Date(+s.date * 1000).getTime(),
          y: Number(avg ? s.avgRate : s.rate)
        }
      })
    }
  }

  render() {
    const { dashboard: { data: { tokenInflation, summaryStatistics }, gittoken: { decimals } } } = this.props
    const { tokenSupply, tokenSymbol } = summaryStatistics

    return (
      <div style={{ marginTop: '25px' }}>
        <div style={{ textAlign: 'left' }}>
          <h3>{`Long-Term Average Token Inflation`}</h3>
        </div>
        <VictoryChart
          scale={{x: "time"}}
          theme={VictoryTheme.material}
          width={600}
          height={300}
          responsive={true}
          padding={{ left: 60, bottom: 50, right: 50, top: 50 }}
        >
          <VictoryGroup>
            <VictoryLegend
              data={[
                { name: 'Long-Term Inflation Average' },
                { name: 'Short-Term Inflation Average', symbol: { fill: "green" } }
              ]}
              x={315}
              y={0}
            />
            <VictoryLine
              style={{
                data: { stroke: "tomato" },
                parent: { border: "1px solid #ccc"}
              }}
              data={this.inflationData({ tokenInflation, avg: true })}
            />
            <VictoryLine
              style={{
                data: { stroke: "green" },
                parent: { border: "1px solid #ccc"}
              }}
              data={this.inflationData({ tokenInflation, avg: false })}
            />
          </VictoryGroup>
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

const TokenInflationChart = connect(mapStoreToProps)(TokenInflationChartComponent)

export default TokenInflationChart
