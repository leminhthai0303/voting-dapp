import Web3 from 'web3';

let web3;

if (window.ethereum) {
  web3 = new Web3(window.ethereum);
  window.ethereum.enable(); // Request access to Metamask
} else if (window.web3) {
  web3 = new Web3(window.web3.currentProvider);
} else {
  // Fallback for non-DApp browsers
  console.log("Non-Ethereum browser detected. You should consider trying MetaMask!");
}

export default web3;