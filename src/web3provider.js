import Web3 from 'web3'
import { web3Provider, useMetaMask } from '../app.config'

function configureWeb3(_count) {
  if (_count > 10) {
    alert('Could not find Web3 Provider. Please Install MetaMask')
    return new Web3(new Web3.providers.HttpProvider(web3Provider))
  } else if (useMetaMask == true) {
    if (typeof window.web3 == 'undefined') {
      setTimeout(() => {
        return configureWeb3(_count++)
      }, 1000)
    } else {
      return new Web3(window.web3.currentProvider)
    }
  } else {
    return new Web3(new Web3.providers.HttpProvider(web3Provider))
  }
}

const web3 = configureWeb3(0)

export default web3
