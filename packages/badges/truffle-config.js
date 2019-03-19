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
            '8B7E0218A6EE39EA6AF202A7381EFB3633B9FA16B54E8957DA8479475E8C0C4D',
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
