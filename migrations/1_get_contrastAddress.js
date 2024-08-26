const MyContract = artifacts.require("MyContract");

module.exports = async function (deployer, network, accounts) {
  const instance = await MyContract.deployed();
  console.log("Contract address:", instance.address);
};
