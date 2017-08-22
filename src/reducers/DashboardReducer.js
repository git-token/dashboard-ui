const INITITAL_DASHBOARD_STATE = {
  // Details about the github user
  github: {
    accessToken: '',
    profile: {
      username: ''
    }
  },
  gittoken: {
    contributorAddress: '',
    showSideNav: false,
    timeUntilNextAuction: 0,
    tokenDetails: {
      address: '',
      decimals: 8,
      name: 'GitToken',
      symbol: 'GTK',
      organization: ''
    }
  },
  forms: {
    auctionBid: {
      bidder: '0x0',
      contract: '',
      round: 0,
      exchangeRate: 0,
      exchangeRateMax: 0,
      ether: 1,
      tokens: 1000,
    }
  },
  modals: {
    tos: false
  },
  views: {
    activeView: 'Auctions',
    options: []
  },
  data: {
    countdown: '',
    currentAuction: {},
    nextAuction: {},
    auctions: [],
    auctionBids: [],
    auctionHistory: [],
    milestones: [],
    totalSupply: [],
    contributionHistory: [],
    leaderboard: {},
    contributionFrequency: [],
    tokenInflation: [],
    tokenInflationMean: [],
    userTokenCreation: [],
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
    case 'TOGGLE_MODAL':
      return {
        ...state,
        modals: {
          [action.id]: action.value
        }
      }
    case 'UPDATE_GITHUB':
      return {
        ...state,
        github: {
          ...state['github'],
          [action.id]: action.value
        }
      }
    case 'UPDATE_GITTOKEN':
      return {
        ...state,
        gittoken: {
          ...state['gittoken'],
          [action.id]: action.value
        }
      }
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
    case 'UPDATE_FORM':
      return {
        ...state,
        forms: {
          ...state['forms'],
          [action.form]: {
            ...state['forms'][action.form],
            [action.id]: action.value
          }
        }
      }
    default:
      return state
  }
}
