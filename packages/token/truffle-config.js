const HDWalletProvider = require('truffle-hdwallet-provider');

module.exports = {
  networks: {
    local: {
      host: 'localhost',
      port: 9545,
      gas: 5000000,
      gasPrice: 5e9,
      network_id: '*',
    },
    rinkeby: {
      provider: function() {
          return new HDWalletProvider(
            '',
            'https://rinkeby.infura.io/v3/1ed0e304e8c246df99cfb67eadd9144c'
          );
      },
      network_id: '*',
      gasPrice: 5000000000,
    },
    live: {
      provider: function() {
          return new HDWalletProvider(
            '',
            'https://mainnet.infura.io/v3/1ed0e304e8c246df99cfb67eadd9144c'
          );
      },
      network_id: '1',
      gasPrice: 5000000000,
    }
  }
}
