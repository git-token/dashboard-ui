import React, { Component } from 'react'
import { connect } from 'react-redux'
import { VictoryLabel, VictoryChart, VictoryLine, VictoryTheme } from 'victory'


class TokenDistributionsChartComponent extends Component {
  constructor(opts) {
    super(opts)
  }

  componentDidMount() {
    const { dispatch } = this.props
  }

  getUnique

  parseContributions () {
    const { dashboard: { gittoken: { contributions, decimals } } } = this.props
    const events = Object.keys(contributions)

    let initValue = 0

    if (events.length > 2) {
      return events.sort((a, b) => {
        const d1 = new Date(contributions[a]['args']['date'].toNumber())
        const d2 = new Date(contributions[b]['args']['date'].toNumber())
        return d1 - d2
      }).map((e, i) => {
        const { args: { date, value } } = contributions[e]
        return {
          x: new Date(date.toNumber() * 1000).getTime(),
          y: parseInt(initValue += (value.toNumber() / Math.pow(10, decimals)))
        }
      })
    }
  }

  render() {
    const { dashboard: { gittoken } } = this.props
    const { symbol, organization } = gittoken

    const data = this.parseContributions()
    const totalSupply = !data ? 0 : data[data.length - 1]['y']

    return (
      <div style={{ marginTop: '25px' }}>
        <div style={{ textAlign: 'center', marginBottom: '-10px' }}>
          <h3>{`Total Token Supply | ${totalSupply} ${symbol}`}</h3>
        </div>
        <VictoryChart
          scale={{x: "time"}}
          theme={VictoryTheme.material}
          width={600}
          height={200}
          responsive={true}
        >
          <VictoryLine
            style={{
              data: { stroke: "#c43a31" },
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
