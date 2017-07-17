import Promise, { promisifyAll } from 'bluebird'
import GitTokenContract from 'gittoken-contracts/build/contracts/GitToken.json'
import { w3cwebsocket } from 'websocket'
import axios from 'axios'

import { initializeContract } from './ContractActions'
import { socketServer } from '../../app.config'
import web3 from '../web3Provider'

const eth = promisifyAll(web3.eth)
const { abi, unlinked_binary } = JSON.parse(GitTokenContract)

let SocketClient;

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

export function retrieveConctractDetails() {
  return (dispatch) => {
    SocketClient.send(JSON.stringify({ event: 'contractDetails' }))

    SocketClient.onmessage = (e) => {
      const { txReceipt: { contractAddress } } = JSON.parse(e.data)
      dispatch(initializeContract({ contractAddress }))
    }
  }
}

export function authenticateGitHubUser() {
  return (dispatch) => {
    eth.getAccountsAsync()
      .then((accounts) => {
        const address = accounts[0]
        console.log('address', address)
        return axios.post(`https://gittoken.org/gittoken/verify/${address}`)
      })
      .then((result) => {
        console.log('authenticateGitHubUser::result', result)
      })
      // .catch((error) => {
      //   console.log('authenticateGitHubUser::error', error)
      // })
    // window.location.replace('/auth/github')
  }
}
