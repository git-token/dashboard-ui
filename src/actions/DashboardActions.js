import GitTokenContract from 'gittoken-contracts/build/contracts/GitToken.json'
import { w3cwebsocket } from 'websocket'
import web3 from '../web3Provider'
import { initializeContract } from './ContractActions'

const { abi, unlinked_binary } = JSON.parse(GitTokenContract)

let SocketClient;
let GitToken

export function ConnectToWebSocket () {
  return (dispatch) => {
    SocketClient = new w3cwebsocket('wss://gittoken.org/ws/', 'echo-protocol')

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
