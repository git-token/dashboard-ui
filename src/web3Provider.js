import Web3 from 'web3'
import { web3Provider } from '../app.config'

export default function setupWeb3Provider() {
  return new Promise((resolve, reject) => {
    try {
      if (typeof window.web3 !== 'undefined') {
        window.web3 = new Web3(window.web3.currentProvider)
      } else {
        window.web3 = new Web3(new Web3.providers.HttpProvider(web3Provider))
      }
      resolve(window.web3)
    } catch(error) {
      reject(error)
    }
  })
}
