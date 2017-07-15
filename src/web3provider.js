import Web3 from 'web3'
import { web3Provider, useMetaMask } from '../app.config'

if (typeof web3 !== 'undefined' && useMetaMask == true) {
  window.web3 = new Web3(web3.currentProvider)
} else {
  window.web3 = new Web3(new Web3.providers.HttpProvider(web3Provider))
}

export default window.web3
