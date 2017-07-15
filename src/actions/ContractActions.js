import GitTokenContract from 'gittoken-contracts/build/contracts/GitToken.json'
import { w3cwebsocket } from 'websocket'
import web3 from '../web3Provider'

const { abi, unlinked_binary } = JSON.parse(GitTokenContract)

let GitToken

export function initializeContract ({ contractAddress }) {
  return (dispatch) => {
    try {
      GitToken = web3.eth.contract(abi).at(contractAddress)
      dispatch({
        type: 'SET_GITTOKEN_DETAILS',
        id: 'contract',
        value: contractAddress
      })
      dispatch(getContributionEvents({ contractAddress }))
    } catch(error) {
      console.log('retrieveConctractDetails::error', error)
    }
  }
}

export function getContributionEvents({ contractAddress }) {
  return (dispatch) => {
    if (!GitToken) {
      dispatch(initializeContract({ contractAddress }))
    } else {
      let events = GitToken.Contribution({}, { fromBlock: 0, toBlock: 'latest' })
      events.watch((error, result) => {
        if (error) {
          dispatch(errorMsg(error))
        } else {
          dispatch({
            type: 'UPDATE_GITTOKEN_CONTRIBUTION',
            id: result['transactionHash'],
            value: result
          })
        }
      })
    }
  }
}

export function errorMsg (error) {
  return (dispatch) => {
    console.log(`errorMsg::error`, error)
  }
}
