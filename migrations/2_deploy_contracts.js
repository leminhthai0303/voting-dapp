const Voting = artifacts.require("Voting");
 
module.exports = async function(deployer, network, accounts) {
    const instance = await MyContract.deployed();
    console.log("Contract address:", instance.address);
    const privilegedVoters = accounts.slice(0, 5);
    deployer.deploy(Voting, privilegedVoters);
};
