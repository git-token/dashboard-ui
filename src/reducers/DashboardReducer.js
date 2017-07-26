const INITITAL_DASHBOARD_STATE = {
  // Details about the github user
  github: {
    accessToken: '',
    profile: {
      username: '' //'Ryanmtate'
    }
  },
  gittoken: {
    contributorAddress: '', //'0x8CB2CeBB0070b231d4BA4D3b747acAebDFbbD142',
    contractAddress: '',
    contributions: {},
    contributors: {},
    symbol: '', //'GTK',
    name: '', //'GitToken',
    organization: '', //'git-token',
    totalSupply: 0,
    reservedValue: 0,
    decimals: 8,
    rewardFrequencies: {},
    leaderBoard: {},
    numContributions: {},
    showSideNav: false,
    latestContribution: 0
  },
  data: {
    totalSupply: [],
    contributionHistory: [],
    leaderboard: {},
    contributionFrequency: [],
    tokenInflation: [],
    summaryStatistics: {}
  }
}

export default function DashboardReducer(state=INITITAL_DASHBOARD_STATE, action) {
  switch(action.type) {
    case 'INIT_DATA':
      return {
        ...state,
        data: {
          ...state['data'],
          [action.id]: action.value
        }
      }
    case 'SET_LEADERBOARD_DATA':
      return {
        ...state,
        data: {
          ...state['data'],
          leaderboard: {
            ...state['data']['leaderboard'],
            [action.id]: action.value
          }
        }
      }
    case 'SET_LATEST_CONTRIBUTION':
      return {
        ...state,
        gittoken: {
          ...state['gittoken'],
          latestContribution:
            action.value > state['gittoken']['latestContribution'] ?
              action.value : state['gittoken']['latestContribution']
        }
      }
    case 'UPDATE_LEADER_BOARD':
      return {
        ...state,
        gittoken: {
          ...state['gittoken'],
          leaderBoard: {
            ...state['gittoken']['leaderBoard'],
            [action.id]: state['gittoken']['leaderBoard'][action.id] ?
              state['gittoken']['leaderBoard'][action.id] += action.value :
              state['gittoken']['leaderBoard'][action.id] = action.value
          },
          numContributions: {
            ...state['gittoken']['numContributions'],
            [action.id]: state['gittoken']['numContributions'][action.id] ?
              state['gittoken']['numContributions'][action.id] += 1 :
              state['gittoken']['numContributions'][action.id] = 1
          }
        }
      }
    case 'UPDATE_RESERVED_VALUE':
      return {
        ...state,
        gittoken: {
          ...state['gittoken'],
          reservedValue: state['gittoken']['reservedValue'] ?
            state['gittoken']['reservedValue'] += action.value :
            state['gittoken']['reservedValue'] = action.value
        }
      }
    case 'UPDATE_TOTAL_SUPPLY':
      return {
        ...state,
        gittoken: {
          ...state['gittoken'],
          totalSupply: state['gittoken']['totalSupply'] ?
            state['gittoken']['totalSupply'] += action.value :
            state['gittoken']['totalSupply'] = action.value
        }
      }
    case 'UPDATE_CONTRIBUTION_FREQUENCY':
      return {
        ...state,
        gittoken: {
          ...state['gittoken'],
          rewardFrequencies: {
            ...state['gittoken']['rewardFrequencies'],
            [action.id]: state['gittoken']['rewardFrequencies'][action.id] ?
              state['gittoken']['rewardFrequencies'][action.id] += 1 :
              state['gittoken']['rewardFrequencies'][action.id] = 1
          }
        }
      }
    case 'UPDATE_GITTOKEN_CONTRIBUTION':
      return {
        ...state,
        gittoken: {
          ...state['gittoken'],
          contributions: {
            ...state['gittoken']['contributions'],
            [action.id]: action.value
          }
        }
      }
    case 'UPDATE_GITTOKEN_CONTRIBUTORS':
      return {
        ...state,
        gittoken: {
          ...state['gittoken'],
          contributors: {
            ...state['gittoken']['contributors'],
            [action.id]: action.value
          }
        }
      }
    case 'SET_GITTOKEN_DETAILS':
      return {
        ...state,
        gittoken: {
          ...state['gittoken'],
          [action.id]: action.value
        }
      }
    case 'SET_GITHUB_DETAILS':
      return {
        ...state,
        github: {
          ...state['github'],
          [action.id]: action.value
        }
      }
    default:
      return state
  }
}
