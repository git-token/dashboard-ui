import Web3 from 'web3'
import { web3Provider, useMetaMask } from '../app.config'

function configureWeb3() {
  if (typeof window.web3 !== 'undefined' && useMetaMask == true) {
    console.log('Configuring Web3 for MetaMask')
    return new Web3(window.web3.currentProvider)
  } else {
    return new Web3(new Web3.providers.HttpProvider(web3Provider))
  }
}

window.web3 = configureWeb3()

export default window.web3
