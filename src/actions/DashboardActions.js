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
        // dispatch(authenticateGitHubUser())
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
    console.log('leaderboard', leaderboard)
    Promise.resolve(leaderboard).map((ranking) => {
      dispatch(updateLeaderboard({ ranking }))
    }).catch((error) => {
      console.log('initLeaderboard::error', error)
    })
  }
}

export function retrieveConctractDetails() {
  return (dispatch) => {
    SocketClient.send(JSON.stringify({ event: 'analytics' }))

    SocketClient.onmessage = (e) => {
      const { event, data} = JSON.parse(e.data)
      switch(event) {
        case 'get_totalSupply':
          dispatch({ type: 'INIT_DATA', id: "totalSupply", value: data })
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
        case 'get_summary_statistics':
          // console.log('get_summary_statistics::data', data)
          dispatch({ type: 'INIT_DATA', id: "summaryStatistics", value: data })
          break;
        case 'broadcast_contribution_data':
          console.log('broadcast_contribution_data', data)
          const {
            leaderboard,
            totalSupply,
            contributionFrequency,
            summaryStatistics,
            tokenInflation,
            contributionHistory
          } = data
          dispatch({ type: 'INIT_DATA', id: "summaryStatistics", value: summaryStatistics })
          dispatch(updateLeaderboard({ ranking: leaderboard }))
          dispatch({ type: 'UPDATE_TOTAL_SUPPLY', value: totalSupply })
          // dispatch({ type: 'INIT_DATA', id: "summaryStatistics", value: summaryStatistics })
          // dispatch({ type: 'INIT_CONTRIBUTION_FREQUENCY_DATA', value: data })
          break;
        default:
          alert(`Incoming Unhandled Event: ${event}`)
      }
    }
  }
}

export function authenticateGitHubUser() {
  return (dispatch) => {
      const eth = promisifyAll(web3.eth)
      eth.getAccountsAsync().then((accounts) => {
        const address = accounts[0]
        console.log('address', address)
        return axios.post(`https://gittoken.org/gittoken/verify/${address}`)
      })
      .then((result) => {
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
