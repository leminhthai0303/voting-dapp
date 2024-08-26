import web3 from './web3';
import Voting from './Voting.json';

const contractAddress = '0x4c34e3EbD029cbF2a6b502F4024b0B69eb93e5a8';
const contract = new web3.eth.Contract(Voting.abi, contractAddress);

export default contract;