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
        id: 'contractAddress',
        value: contractAddress
      })
      dispatch(getContractDetails({ contractAddress }))
      dispatch(getContributionEvents({ contractAddress }))
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

export function rewardFrequency({ contributionEvent }) {
  return (dispatch) => {
    const { args: { rewardType } } = contributionEvent
    dispatch({
      type: 'UPDATE_CONTRIBUTION_FREQUENCY',
      id: rewardType,
      value: 1
    })
    dispatch({
      type: 'UPDATE_CONTRIBUTION_FREQUENCY',
      id: 'total',
      value: 1
    })
  }
}

export function reservedValue({ contributionEvent }) {
  return (dispatch) => {
    const { args: { reservedValue } } = contributionEvent
    dispatch({
      type: 'UPDATE_RESERVED_VALUE',
      id: 'reservedValue',
      value: reservedValue
    })
  }
}

export function leaderBoard({ contributionEvent }) {
  return (dispatch) => {
    const { args: { username, value, reservedValue } } = contributionEvent
    dispatch({
      type: 'UPDATE_LEADER_BOARD',
      id: username,
      value: value.toNumber()
    })
    dispatch({
      type: 'UPDATE_LEADER_BOARD',
      id: 'Total',
      value: Number(value.toNumber() + reservedValue.toNumber())
    })
  }
}

export function totalTokensCreated({ contributionEvent }) {
  return (dispatch) => {
    const { args: { value, reservedValue } } = contributionEvent
    dispatch({
      type: 'UPDATE_TOTAL_SUPPLY',
      value: Number(value.toNumber() + reservedValue.toNumber())
    })
  }
}

export function getContributionEvents({ contractAddress }) {
  return (dispatch) => {
    console.log('getContributionEvents::contractAddress', contractAddress)
    if (!GitToken) {
      dispatch(initializeContract({ contractAddress }))
    } else {
      // console.log('GitToken', GitToken)
      let events = GitToken.Contribution({}, { fromBlock: 0, toBlock: 'latest' })
      events.watch((error, result) => {
        if (error) {
          dispatch(errorMsg(error))
        } else {
          const { args: { date } } = result;
          dispatch(totalTokensCreated({ contributionEvent: result }))
          dispatch(leaderBoard({ contributionEvent: result }))
          dispatch(rewardFrequency({ contributionEvent: result }))
          dispatch({
            type: 'SET_LATEST_CONTRIBUTION',
            value: date.toNumber()
          })
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
        GitToken.balanceOf.callAsync(contractAddress),
      ).then((data) => {
        /* NOTE Retrieve total supply from watching contribution events */
        // dispatch({ type: 'SET_GITTOKEN_DETAILS', id: 'totalSupply', value: data[0].toNumber() / Math.pow(10, data[3].toNumber()) })

        const decimals = data[3].toNumber()
        const reservedValue = data[5].toNumber()

        dispatch({ type: 'SET_GITTOKEN_DETAILS', id: 'symbol', value: data[1] })
        dispatch({ type: 'SET_GITTOKEN_DETAILS', id: 'organization', value: data[2] })
        dispatch({ type: 'SET_GITTOKEN_DETAILS', id: 'decimals', value: decimals })
        dispatch({ type: 'SET_GITTOKEN_DETAILS', id: 'name', value: data[4] })
        dispatch({ type: 'SET_GITTOKEN_DETAILS', id: 'reservedValue', value: reservedValue  })
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
  let contract = window.web3.eth.contract(abi).at(contractAddress)
  Object.keys(contract).map((method) => {
    if (contract[method] && contract[method]['request']) {
      contract[method] = promisifyAll(contract[method])
    }
  })
  return contract
}
