var PrivateKeyProvider = require("truffle-privatekey-provider");

var infuraKey = "...";
var privateKey = "...";

module.exports = {
  networks: {
    development: {
      protocol: 'http',
      host: 'localhost',
      port: 8545,
      gas: 5000000,
      gasPrice: 5e9,
      networkId: '*',
    },
    ropsten: {
      provider: function() {
        return new PrivateKeyProvider(privateKey, `https://ropsten.infura.io/v3/${infuraKey}`);
      },
      network_id: 3,
    },
  },
};
