import Web3 from 'web3'
import { web3Provider } from '../app.config'

function setupWeb3Provider() {
  if (typeof web3 !== 'undefined') {
    return new Web3(web3.currentProvider)
  } else {
    return new Web3(new Web3.providers.HttpProvider(web3Provider))
  }
}
console.log('window.web3.currentProvider', window.web3.currentProvider)
const _web3 = new Web3(window.web3.currentProvider) //setupWeb3Provider()

export default _web3
