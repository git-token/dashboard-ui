import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  VictoryLabel,
  VictoryChart,
  VictoryGroup,
  VictoryBar,
  VictoryTheme,
  VictoryAxis
} from 'victory'


class GitContributionFrequencyChartComponent extends Component {
  constructor(opts) {
    super(opts)
  }

  componentDidMount() {
    const { dispatch } = this.props
  }

  frequencyData () {
    const { dashboard: { gittoken: { rewardFrequencies } } } = this.props
    if (!rewardFrequencies['total']) {
      return []
    } else {
      return Object.keys(rewardFrequencies).filter((f) => {
        if (f != 'total') {
          return true
        }
      }).map((f, i) => {
        let y = Number(rewardFrequencies[f] / rewardFrequencies['total']) * 100
        return { x: f, y }
      })
    }
  }

  render() {
    const { dashboard: { gittoken } } = this.props
    const { symbol, organization, rewardFrequencies } = gittoken

    const data = this.frequencyData()

    return (
      <div style={{ marginTop: '25px' }}>
        <div style={{ textAlign: 'center', marginBottom: '-10px' }}>
          <h3>Frequency of Git Contributions</h3>
        </div>
        <VictoryChart
          theme={VictoryTheme.material}
          width={600}
          height={300}
          responsive={true}
        >
          <VictoryAxis
            crossAxis
            orientation={"top"}
          />
          <VictoryGroup
            horizontal
          >
            <VictoryBar
              style={{
                data: { fill: "tomato" },
                parent: { border: "1px solid #ccc"}
              }}
              data={data}
              labels={(d) => d.x}
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

const GitContributionFrequencyChart = connect(mapStoreToProps)(GitContributionFrequencyChartComponent)

export default GitContributionFrequencyChart
