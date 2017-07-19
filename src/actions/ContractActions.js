import Promise, { join, promisifyAll } from 'bluebird'
import GitTokenContract from 'gittoken-contracts/build/contracts/GitToken.json'
import { w3cwebsocket } from 'websocket'

const { abi, unlinked_binary } = JSON.parse(GitTokenContract)

let GitToken

export function initializeContract ({ contractAddress }) {
  return (dispatch) => {
    try {
      GitToken = promisifyContract({ abi, contractAddress })
      dispatch({
        type: 'SET_GITTOKEN_DETAILS',
        id: 'contract',
        value: contractAddress
      })
      dispatch(getContractDetails({ contractAddress }))
      dispatch(getContributionEvents({ contractAddress }))
      dispatch(getContributorVerifiedEvents({ contractAddress }))
    } catch(error) {
      console.log('retrieveConctractDetails::error', error)
    }
  }
}

export function getContributorVerifiedEvents({ contractAddress }) {
  return (dispatch) => {
    if (!GitToken) {
      dispatch(initializeContract({ contractAddress }))
    } else {
      let events = GitToken.ContributorVerified({}, { fromBlock: 0, toBlock: 'latest' })
      events.watch((error, result) => {
        if (error) {
          dispatch(errorMsg(error))
        } else {
          const { args: { contributor, username } } = result
          dispatch({
            type: 'UPDATE_GITTOKEN_CONTRIBUTORS',
            id: contributor,
            value: username
          })
        }
      })
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

export function getContractDetails({ contractAddress }) {
  return (dispatch) => {
    if (!GitToken) {
      dispatch(initializeContract({ contractAddress }))
    } else {
      join(
        GitToken.totalSupply.callAsync(),
        GitToken.symbol.callAsync(),
        GitToken.organization.callAsync(),
        GitToken.decimals.callAsync(),
        GitToken.name.callAsync(),
      ).then((data) => {
        dispatch({ type: 'SET_GITTOKEN_DETAILS', id: 'totalSupply', value: data[0].toNumber() / Math.pow(10, data[3].toNumber()) })
        dispatch({ type: 'SET_GITTOKEN_DETAILS', id: 'symbol', value: data[1] })
        dispatch({ type: 'SET_GITTOKEN_DETAILS', id: 'organization', value: data[2] })
        dispatch({ type: 'SET_GITTOKEN_DETAILS', id: 'decimals', value: data[3].toNumber() })
        dispatch({ type: 'SET_GITTOKEN_DETAILS', id: 'name', value: data[4] })
      }).catch((error) => {
        dispatch(errorMsg(error))
      })
    }
  }
}

export function errorMsg (error) {
  return (dispatch) => {
    console.log(`errorMsg::error`, error)
  }
}

export function promisifyContract ({ abi, contractAddress }) {
  let contract = web3.eth.contract(abi).at(contractAddress)
  Object.keys(contract).map((method) => {
    if (contract[method] && contract[method]['request']) {
      contract[method] = promisifyAll(contract[method])
    }
  })
  return contract
}
