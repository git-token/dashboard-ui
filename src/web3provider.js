import Web3 from 'web3'
import { web3Provider, useMetaMask } from '../app.config'

const web3 = window.addEventListener('load', () => {
  if (typeof window.web3 !== 'undefined' && useMetaMask == true) {
    return new Web3(window.web3.currentProvider)
  } else {
    return new Web3(new Web3.providers.HttpProvider(web3Provider))
  }
})

export default web3
