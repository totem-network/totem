import { accountAddressSelector, boxes } from 'account';
import { Contract, utils } from 'ethers';
import { Provider } from 'ethers/providers/abstract-provider';
import { BlockchainProviderManager, currentNetworkSelector } from 'network';
import { store } from 'state';
import ERC20AbiJSON from './erc20.json';

const ERC20Abi = JSON.stringify(ERC20AbiJSON);

const getERC20Contracts = async (account: string, provider: Provider) => {
    // TODO: make 3box compatible with ethers.js providers

    if (!(
        (window as any).ethereum
    )) {
        return [];
    }

    const box = await boxes.openBox(account, (window as any).ethereum);

    const space = await box.openSpace('totem');

    let erc20Contracts: string[] | null = await space.private.get('cryptoCurrencies');

    if (!erc20Contracts) {
        erc20Contracts = [];
    }

    return erc20Contracts;
};

const getERC20Data = async (account: string, contract: string) => {
    const state = store.getState();
    const currentNetwork = currentNetworkSelector(state);

    const web3 = BlockchainProviderManager.getProvider(
        currentNetwork.platform,
        currentNetwork.network,
    );

    if (!web3) {
        return {
            balance: '0',
            icon: '/images/cryptocurrency-icons/generic.svg',
            name: '???',
        };
    }

    const tokenContract = new Contract(contract, ERC20Abi, web3);

    const balance = await tokenContract.balanceOf(account);
    const symbol = await tokenContract.symbol();
    const decimals = await tokenContract.decimals();

    let divisor = utils.bigNumberify(10);
    if (decimals === 0) {
        divisor = utils.bigNumberify(1);
    }

    for (let i = 1; i < decimals; i++) {
        divisor = divisor.mul(10);
    }

    const userBalance = balance.div(divisor).toString();

    return {
        balance: userBalance,
        icon: `/images/cryptocurrency-icons/${symbol}.svg`,
        name: symbol,
    };
};

export default {
    addToken: async (args: any) => {
        const state = store.getState();
        const account = accountAddressSelector(state);
        const currentNetwork = currentNetworkSelector(state);

        const web3 = BlockchainProviderManager.getProvider(
            currentNetwork.platform,
            currentNetwork.network,
        );

        if (!web3) {
            return {
                result: false,
            };
        }

        const tokenContract = new Contract(args.contract, ERC20Abi, web3);

        const totalSupply = await tokenContract.totalSupply();

        if (!totalSupply) {
            return {
                result: false,
            };
        }

        // TODO: make 3box compatible with ethers.js providers

        if (!(
            (window as any).ethereum
        )) {
            return {
                result: false,
            };
        }

        const box = await boxes.openBox(account, (window as any).ethereum);

        const space = await box.openSpace('totem');

        let erc20Contracts: string[] | null = await space.private.get('cryptoCurrencies');

        if (!erc20Contracts) {
            erc20Contracts = [];
        }

        // TODO: only add if not already added
        erc20Contracts.push(args.contract);

        space.private.set('cryptoCurrencies', erc20Contracts);

        return {
            result: true,
        };
    },

    cryptoCurrencies: async () => {
        const cryptoCurrencies: Array<{
            balance: string;
            icon: string;
            name: string;
        }> = [];

        const state = store.getState();
        const account = accountAddressSelector(state);
        const currentNetwork = currentNetworkSelector(state);

        const web3 = BlockchainProviderManager.getProvider(
            currentNetwork.platform,
            currentNetwork.network,
        );

        if (!web3) {
            return cryptoCurrencies;
        }

        const etherBalance = await web3.getBalance(account);

        cryptoCurrencies.push({
            balance: utils.formatEther(etherBalance),
            icon: '/images/cryptocurrency-icons/eth.svg',
            name: 'ETH',
        });

        const erc20Contracts = await getERC20Contracts(account, web3);

        for (const token of erc20Contracts) {
            cryptoCurrencies.push(
                await getERC20Data(account, token),
            );
        }

        return cryptoCurrencies;
    },

    cryptoCurrenciesByAccount: async (args: any) => {
        //
    },
};
