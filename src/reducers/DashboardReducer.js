const INITITAL_DASHBOARD_STATE = {
  // Details about the github user
  github: {
    accessToken: '',
    profile: {
      username: '' //'Ryanmtate'
    }
  },
  gittoken: {
    contributorAddress: '',
    decimals: 8,
    showSideNav: false,
  },
  views: {
    activeView: 'Token Statistics',
    options: [
      'Account Settings',
      'Contract Settings'
    ]
  },
  data: {
    totalSupply: [],
    contributionHistory: [],
    leaderboard: {},
    contributionFrequency: [],
    tokenInflation: [],
    summaryStatistics: {
      githubOrganization: '',
      contractAddress: '',
      tokenName: '',
      tokenSymbol: '',
      latestContribution: 0,
      tokenSupply: 0,
      reservedSupply: 0,
      percentReserved: 0,
      tokenInflation: 0,
      totalContributions: 0,
      uniqueContributions: 0
    }
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
    case 'UPDATE_DATA':
      return {
        ...state,
        data: {
          ...state['data'],
          [action.id]: [
            ...state['data'][action.id],
            action.value
          ]
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
    case 'UPDATE_VIEWS_DATA':
      return {
        ...state,
        views: {
          ...state['views'],
          [action.id]: action.value
        }
      }
    default:
      return state
  }
}
