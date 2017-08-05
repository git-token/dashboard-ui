import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  VictoryLabel,
  VictoryChart,
  VictoryGroup,
  VictoryScatter,
  VictoryTheme,
  VictoryAxis
} from 'victory'


class TokensVsContributionsScatterChartComponent extends Component {
  constructor(opts) {
    super(opts)
  }

  componentDidMount() {
    const { dispatch } = this.props
  }

  data() {
    const { dashboard: { data: { leaderboard, summaryStatistics: { totalContributions, tokenSupply } }, gittoken: { tokenDetails: { decimals } } } } = this.props
    return Object.keys(leaderboard).map((user) => {
      const { value, numContributions, username } = leaderboard[user]
      const x = Number(value / Math.pow(10, decimals))
      const y = numContributions
      const d = {
        x,
        y,
        size: parseInt((numContributions / totalContributions)*( value/tokenSupply) * 50),
        label: username,
        symbol: 'circle'
      }
      return d
    })
  }

  render() {

    const data = this.data()

    return (
      <div style={{ marginTop: '25px' }}>
        <div style={{ textAlign: 'left' }}>
          <h3>Tokens Vs. Contributions</h3>
        </div>
        <VictoryChart
          theme={VictoryTheme.material}
          width={600}
          height={300}
          responsive={true}
          padding={{ left: 60, bottom: 50, right: 50, top: 50 }}
        >

          <VictoryScatter
            style={{
              data: { fill: "tomato" },
              parent: { border: "1px solid #ccc"}
            }}
            data={data}
            size={(d) => d.size}
            minBubbleSize={1}
            maxBubbleSize={150}
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

const TokensVsContributionsScatterChart = connect(mapStoreToProps)(TokensVsContributionsScatterChartComponent)

export default TokensVsContributionsScatterChart
