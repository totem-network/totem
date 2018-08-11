const HDWalletProvider = require('truffle-hdwallet-provider');
const HDWalletProviderPrivkey = require('truffle-hdwallet-provider-privkey');
const LedgerProvider = require('truffle-ledger-provider');

const INFURA_API_KEY = '1ed0e304e8c246df99cfb67eadd9144c';

const mnemonic = 'exclude virus file basket confirm sock ten guide actress sketch dizzy race';

module.exports = {
    networks: {
        development: {
            from: '0x06627a2287bf6976f10132cc704e847aaf7a411a',
            network_id: '10545',
            provider: () => {
                return new HDWalletProvider(mnemonic, 'http://127.0.0.1:8545');
            }
        },
        developmentPersist: {
            from: '0x06627a2287bf6976f10132cc704e847aaf7a411a',
            network_id: '10545',
            provider: () => {
                return new HDWalletProvider(mnemonic, 'http://127.0.0.1:10545');
            }
        },
        mainnet: {
            gas: 4600000,
            gasPrice: 4000000000,
            network_id: 1,
            provider: () => {
                return new HDWalletProviderPrivkey(
                    '', 'https://mainnet.infura.io/v3/' + INFURA_API_KEY
                );
            }
        },
        ropsten: {
            gas: 4600000,
            gasPrice: 10000000000,
            network_id: 3,
            provider: () => {
                return new HDWalletProviderPrivkey(
                    '', 'https://ropsten.infura.io/v3/' + INFURA_API_KEY
                );
            }
        },
        test: {
            from: '0x06627a2287bf6976f10132cc704e847aaf7a411a',
            network_id: '10545',
            provider: () => {
                return new HDWalletProvider(mnemonic, 'http://127.0.0.1:8545');
            }
        }
    }
};
