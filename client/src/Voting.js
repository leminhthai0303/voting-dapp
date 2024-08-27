import web3 from './web3';
import Voting from './Voting.json';

const networkId = await web3.eth.net.getId();
const deployedNetwork = Voting.networks[networkId];
const contractAddress = deployedNetwork && deployedNetwork.address;

if (!contractAddress) {
  throw new Error("Contract not deployed to the current network");
}

const contract = new web3.eth.Contract(Voting.abi, contractAddress);

export default contract;