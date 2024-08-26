module.exports = {
  networks: {
    host: "127.0.0.1",
      port: 7545, // This is the default Ganache port
      network_id: "*" // Match any network id
  },
  mocha: {
  },
  compilers: {
    solc: {
      version: "^0.8.0",
    }
  },
};
