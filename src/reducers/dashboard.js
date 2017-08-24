const INITITAL_DASHBOARD_STATE = {
	name: 'GitToken',
  organization: 'git-token',
	symbol: 'GTK',
	address: '0x0',
	sideNav: {
		show: false,
		items: [
			'Contributions',
			'Leader Board',
			'Project Milestones',
			'Auction',
			'Exchange',
			'Settings'
		]
	}
}

export default function DashboardReducer(state=INITITAL_DASHBOARD_STATE, action) {
  switch(action.type) {
    case 'UPDATE_DASHBOARD':
      return {
        ...state,
        [action.id]: action.value
      }
    default:
      return state
  }
}
