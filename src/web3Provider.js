import Web3 from 'web3'
import { web3Provider } from '../app.config'

function setupWeb3Provider() {
  if (typeof web3 !== 'undefined') {
    return new Web3(web3.currentProvider)
  } else {
    return new Web3(new Web3.providers.HttpProvider(web3Provider))
  }
}

window.web3 = setupWeb3Provider()

const web3 = window.web3

export default web3
