const Voting = artifacts.require("Voting");

module.exports = function(deployer, network, accounts) {
    const privilegedVoters = accounts.slice(0, 5);
    deployer.deploy(Voting, privilegedVoters);
};
