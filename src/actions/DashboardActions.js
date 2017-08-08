import Promise, { delay, promisifyAll } from 'bluebird'
import GitTokenContract from 'gittoken-contracts/build/contracts/GitToken.json'
import { w3cwebsocket } from 'websocket'
import axios from 'axios'

import { initializeContract } from './ContractActions'
import { socketServer, web3Provider } from '../../app.config'

const { abi, unlinked_binary } = JSON.parse(GitTokenContract)

let SocketClient;

export function loadWeb3() {
  return (dispatch) => {
    delay(1000).then(() => {
      // console.log('web3.currentProvider', web3.currentProvider)
      if(!web3 || !web3.eth || !web3.currentProvider) {
        dispatch(loadWeb3())
      } else {
        dispatch(ConnectToWebSocket())
      }
      return null;
    }).catch((error) => {
      console.log('error', error)
    })
  }
}

export function ConnectToWebSocket () {
  return (dispatch) => {
    SocketClient = new w3cwebsocket(socketServer, 'echo-protocol')

    SocketClient.onopen = () => {
      console.log('Socket Connection Opened')
      dispatch({ type: 'SOCKET_CONNECTION', value: true })
      dispatch(retrieveConctractDetails())
    }

    SocketClient.onerror = () => {
      dispatch({ type: 'SOCKET_CONNECTION', value: false })
    }
  }
}

export function updateLeaderboard({ ranking }) {
  return (dispatch) => {
    const { username } = ranking
    dispatch({ type: 'SET_LEADERBOARD_DATA', id: username, value: ranking })
  }
}

export function initLeaderboard({ leaderboard }) {
  return (dispatch) => {
    Promise.resolve(leaderboard).map((ranking) => {
      dispatch(updateLeaderboard({ ranking }))
    }).catch((error) => {
      console.log('initLeaderboard::error', error)
    })
  }
}

export function initTotalSupply({ totalSupply }) {
  return (dispatch) => {
    Promise.resolve(totalSupply).map((datum) => {
      const { date, totalSupply } = datum
      dispatch({ type: 'UPDATE_TOKEN_SUPPLY', id: date, value: totalSupply })
    }).catch((error) => {
      console.log('initTotalSupply::error', error)
    })
  }
}

export function retrieveConctractDetails() {
  return (dispatch) => {
    SocketClient.send(JSON.stringify({ event: 'analytics' }))

    SocketClient.onmessage = (e) => {
      const { event, data} = JSON.parse(e.data)
      // console.log('event, data', event, data)
      switch(event) {
        case 'contract_details':
          dispatch({ type: 'UPDATE_GITTOKEN', id: "tokenDetails", value: data['contractDetails'] })
          // dispatch(initTotalSupply({ totalSupply: data }))
          break;
        case 'get_total_supply':
          dispatch({ type: 'INIT_DATA', id: "totalSupply", value: data })
          // dispatch(initTotalSupply({ totalSupply: data }))
          break;
        case 'get_leaderboard':
          // dispatch({ type: 'INIT_DATA', id: "leaderboard", value: data })
          dispatch(initLeaderboard({ leaderboard: data }))
          break;
        case 'get_contributions':
          dispatch({ type: 'INIT_DATA', id: "contributionHistory", value: data })
          break;
        case 'get_contribution_frequency':
          dispatch({ type: 'INIT_DATA', id: "contributionFrequency", value: data })
          break;
        case 'get_token_inflation':
          dispatch({ type: 'INIT_DATA', id: "tokenInflation", value: data })
          break;
        case 'get_token_inflation_mean':
          dispatch({ type: 'INIT_DATA', id: "tokenInflationMean", value: data })
          break;
        case 'get_summary_statistics':
          // console.log('get_summary_statistics::data', data)
          dispatch({ type: 'INIT_DATA', id: "summaryStatistics", value: data[0] })
          break;
        case 'get_user_token_creation':
          // console.log('get_user_token_creation::data', data)
          dispatch({ type: 'INIT_DATA', id: "userTokenCreation", value: data })
          break;
        case 'new_contribution':
          dispatch({ type: 'UPDATE_DATA', id: "contributionHistory", value: data })
          break;
        case 'broadcast_contribution_data':
          const leaderboard           = data[0]
          const totalSupply           = data[1]
          const contributionFrequency = data[2]
          const tokenInflationRate    = data[3]
          const inflationRateAverage  = data[4]
          const summaryStatistics     = data[5]
          const rewardTypeStats       = data[6]
          const userTokenCreation     = data[7]

          /* NOTE Depending on the structure of the data returned and the structure anticipated by the redux store, ensure to use the proper action type (INIT/UPDATE);
          TODO There should be better differentiation here between data structure types...
          */
          dispatch(initLeaderboard({ leaderboard }))
          dispatch({ type: 'UPDATE_DATA', id: "totalSupply", value: totalSupply })
          dispatch({ type: 'INIT_DATA', id: "contributionFrequency", value: contributionFrequency })
          dispatch({ type: 'UPDATE_DATA', id: "tokenInflation", value: tokenInflationRate })
          dispatch({ type: 'UPDATE_DATA', id: "tokenInflationMean", value: inflationRateAverage })
          dispatch({ type: 'INIT_DATA', id: "summaryStatistics", value: summaryStatistics })
          dispatch({ type: 'INIT_DATA', id: "userTokenCreation", value: userTokenCreation })
          break;
        default:
          console.log(`Incoming Unhandled Event: ${event}; data:`)
          console.log('data', data)
      }
    }
  }
}

export function checkEthereumAddress() {
  return (dispatch) => {
    const eth = promisifyAll(web3.eth)
    eth.getAccountsAsync().then((accounts) => {
      const address = accounts[0]
      if (!address) {
        alert(`
          Sorry, we could not find your Ethereum address.

          Please download MetaMask and ensure your MetaMask
          account is unlocked.

          Refresh this page after updating your MetaMask provider.
        `)
      } else {
        dispatch(authenticateGitHubUser({ ethereumAddress: address }))
      }
    }).catch((error) => {
      console.log('checkEthereumAddress::error', error)
    })
  }
}

export function authenticateGitHubUser({ ethereumAddress }) {
  return (dispatch) => {
      axios.post(`https://gittoken.org/gittoken/verify/${ethereumAddress}`).then((result) => {
        const { data: { authentication, address, user } } = result
        if (!authentication) {
          window.location.replace('/auth/github')
        } else {
          const username = user['profile']['username']

          /**
           * Dispatch details about the user to Redux store for UI rendering
           */

          dispatch({
            type: 'UPDATE_GITTOKEN_CONTRIBUTORS',
            id: address,
            value: username
          })

          dispatch({
            type: 'SET_GITTOKEN_DETAILS',
            id: 'contributorAddress',
            value: address
          })

          dispatch({
            type: 'SET_GITHUB_DETAILS',
            id: 'accessToken',
            value: user['accessToken']
          })

          dispatch({
            type: 'SET_GITHUB_DETAILS',
            id: 'profile',
            value: user['profile']
          })
        }
      })
      .catch((error) => {
        console.log('authenticateGitHubUser::error', error)
      })

  }
}

export function timeAgo({ date }) {
  const now = new Date().getTime()
  const then = new Date( date * 1000).getTime()
  const ago = now - then;

  const minute = (1000 * 60)
  const hour   = (1000 * 60 * 60)
  const day   = (1000 * 60 * 60 * 24)
  const week   = (1000 * 60 * 60 * 24 * 7)
  const year   = (1000 * 60 * 60 * 24 * 7 * 52)
  const millenium   = (1000 * 60 * 60 * 24 * 7 * 52 * 1000)

  // less than a minute ago
  if (ago < minute) {
    return `${((ago/minute) * 60).toFixed(2)} seconds ago`
  } else if (ago < hour && ago > minute) {
    return `${((ago/hour) * 60).toFixed(2)} minutes ago`
  } else if (ago < day && ago > hour) {
    return `${((ago/day) * 24).toFixed(2)} hours ago`
  } else if (ago < week && ago > day) {
    return `${((ago/week) * 7).toFixed(2)} days ago`
  } else if (ago < year && ago > week) {
    return `${((ago/year) * 52).toFixed(2)} weeks ago`
  } else if (ago < millenium && ago > year) {
    // will this hold true?
    return `${((ago/year) * 1000).toFixed(2)} years ago`
  }
}
