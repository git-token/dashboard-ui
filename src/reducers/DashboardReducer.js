const INITITAL_DASHBOARD_STATE = {
  // Details about the github user
  github: {
    accessToken: '',
    profile: {
      username: 'Ryanmtate'
    }
  },
  gittoken: {
    contributorAddress: '0x8CB2CeBB0070b231d4BA4D3b747acAebDFbbD142',
    contractAddress: '',
    contributions: {},
    contributors: {},
    symbol: 'GTK',
    name: 'GitToken',
    organization: 'git-token',
    totalSupply: '',
    decimals: 8,
    web3Provider: ''
  },
}

export default function DashboardReducer(state=INITITAL_DASHBOARD_STATE, action) {
  switch(action.type) {
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
