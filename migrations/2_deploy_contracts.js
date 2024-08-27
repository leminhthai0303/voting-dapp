const Voting = artifacts.require("Voting");
 
module.exports = function(deployer, network, accounts) {
    const instance = Voting.deployed();
    console.log("Contract address:", instance.address);
    const privilegedVoters = accounts.slice(0, 5);
    deployer.deploy(Voting, privilegedVoters);
};