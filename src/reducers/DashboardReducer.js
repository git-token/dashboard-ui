const INITITAL_DASHBOARD_STATE = {
  // Details about the github user
  github: {
    login: '',
    email: ''
  },
  gittoken: {
    contractAddress: '',
    contributions: {},
    symbol: '',
    organization: '',
    totalSupply: '',
    decimals: 8
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
