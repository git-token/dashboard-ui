import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  VictoryLabel,
  VictoryTooltip,
  VictoryChart,
  VictoryGroup,
  VictoryStack,
  VictoryArea,
  VictoryPortal,
  VictoryScatter,
  VictoryTheme
} from 'victory'


class UserTokenCreationChartComponent extends Component {
  constructor(opts) {
    super(opts)
  }

  componentDidMount() {
    const { dispatch } = this.props
  }

  userGroups ({ userTokenCreation, username, key }) {
    if (!username || username == 'Total' ) {
      return null
    } else {
      const data = userTokenCreation.filter((s, i) => {
        if (s.username == username) {
          return true
        }
      }).map((s, i) => {
        return {
          x: new Date(+s.date * 1000).getTime(),
          y: Number(s.percentOfTokenSupply) * 100
        }
      })

      return (
        <VictoryGroup data={data} key={key}>
          <VictoryArea />
        {/*<VictoryPortal>
            <VictoryScatter
              style={{ data: { fill: "black" } }}
            />
          </VictoryPortal>*/}
        </VictoryGroup>
      )
    }
  }

  render() {
    const { dashboard: { data: { userTokenCreation, leaderboard, summaryStatistics } } } = this.props
    const { tokenSupply } = summaryStatistics

    return (
      <div style={{ marginTop: '25px' }}>
        <div style={{ textAlign: 'left' }}>
          <h3>{`Token Creation by User`}</h3>
        </div>
        <VictoryChart
          scale={{x: "time"}}
          theme={VictoryTheme.material}
          width={600}
          height={300}
          responsive={true}
          domain={{ y: [0, 100] }}
          padding={{ left: 60, bottom: 50, right: 50, top: 50 }}
        >
          <VictoryStack colorScale="warm" >
            {Object.keys(leaderboard).map((username, i) => {
              return this.userGroups({ userTokenCreation, username, key: i })
            })}
          </VictoryStack>
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

const UserTokenCreationChart = connect(mapStoreToProps)(UserTokenCreationChartComponent)

export default UserTokenCreationChart
