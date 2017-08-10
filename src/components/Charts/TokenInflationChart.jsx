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

  inflationMeanData ({ tokenInflationMean }) {
    if (tokenInflationMean.length) {
      return tokenInflationMean.filter((s, i) => {
        if (s.geometricMean) {
          return true
        }
      }).sort((a, b) => {
        return a.date - b.date;
      }).map((s, i) => {
        return {
          x: new Date(+s.date * 1000).getTime(),
          y: Number(s.geometricMean * 100)
        }
      })
    }
  }

  inflationData ({ tokenInflation }) {
    if (tokenInflation.length) {
      return tokenInflation.filter((s, i) => {
        if (s.periodicRate) {
          return true
        }
      }).sort((a, b) => {
        return a.date - b.date;
      }).map((s, i) => {
        return {
          x: new Date(+s.date * 1000).getTime(),
          y: Number(s.periodicRate * 100)
        }
      })
    }
  }

  render() {
    const { dashboard: { data: { summaryStatistics, tokenInflation, tokenInflationMean } } } = this.props

    return (
      <div style={{ marginTop: '25px' }}>
        <div style={{ textAlign: 'left' }}>
          <h3>{`Token Supply Growth`} | {(+summaryStatistics['tokenInflation']*100).toFixed(3)} %</h3>
        </div>
        <VictoryChart
          scale={{x: "time"}}
          theme={VictoryTheme.material}
          width={600}
          height={300}
          responsive={true}
          padding={{ left: 60, bottom: 50, right: 50, top: 50 }}
          domain={{ y: [0, 40]}}
        >
          <VictoryGroup>
            <VictoryLegend
              data={[
                { name: 'Long-Term Growth Geometric Average' },
                { name: 'Short-Term Growth Periodic Rate', symbol: { fill: "green" } }
              ]}
              x={125}
              y={0}
            />
            <VictoryLine
              style={{
                data: { stroke: "tomato" },
                parent: { border: "1px solid #ccc"}
              }}
              data={this.inflationMeanData({ tokenInflationMean })}
            />
            <VictoryLine
              style={{
                data: { stroke: "green" },
                parent: { border: "1px solid #ccc"}
              }}
              data={this.inflationData({ tokenInflation })}
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
