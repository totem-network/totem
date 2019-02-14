import { accountAddressSelector } from 'account';
import { getDefaultProvider, providers, utils } from 'ethers';
import { store } from 'state';

const getERC20Contracts = async (account: string, provider: providers.BaseProvider) => {
    // TODO: add tokens to 3box spaces and fetch from there

    const erc20Contracts: string[] = [];

    // console.log(erc20Contracts);

    return erc20Contracts;
};

const getERC20Data = async (account: string, contract: string) => {
    // TODO: Fetch balance and info from erc20 tokens

    return {
        balance: '0',
        icon: '/images/cryptocurrency-icons/eth.svg',
        name: 'ETH',
    };
};

export default {
    cryptoCurrencies: async () => {
        const state = store.getState();
        const account = accountAddressSelector(state);

        const web3 = getDefaultProvider('ropsten');

        const etherBalance = await web3.getBalance(account);

        const cryptoCurrencies = [{
            balance: utils.formatEther(etherBalance),
            icon: '/images/cryptocurrency-icons/eth.svg',
            name: 'ETH',
        }];

        const erc20Contracts = await getERC20Contracts(account, web3);

        erc20Contracts.forEach(async (contract) => {
            if (!contract) {
                return;
            }

            cryptoCurrencies.push(
                await getERC20Data(account, contract),
            );
        });

        return cryptoCurrencies;
    },

    cryptoCurrenciesByAccount: async (address: string) => {
        //
    },
};
