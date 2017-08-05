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
    const { dashboard: { data: { contributionFrequency } } } = this.props

    return contributionFrequency.sort((a, b) => {
      return a.count - b.count
    }).map((datum, i) => {
      const { rewardType, count, percentOfTotal } = datum
      // console.log('percentOfTotal', percentOfTotal)
      // console.log('rewardType', rewardType)
      return { x: rewardType, y: percentOfTotal }
    })
  }

  render() {
    const data = this.frequencyData()

    return (
      <div style={{ marginTop: '25px' }}>
        <div style={{ textAlign: 'left', marginBottom: '-10px' }}>
          <h3>Frequency of Git Contributions</h3>
        </div>
        <VictoryChart
          theme={VictoryTheme.material}
          width={600}
          height={300}
          responsive={true}
        >
          <VictoryAxis />
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
