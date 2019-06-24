import { accountAddressSelector, boxes } from 'account';
import { Contract, utils } from 'ethers';
import { Provider } from 'ethers/providers/abstract-provider';
import { BlockchainProviderManager, currentNetworkSelector } from 'network';
import { store } from 'state';
import { containsAddress } from 'utils/ethereum';
import ERC20AbiJSON from './erc20.json';

// TODO: functions to interact with contracts, that are catching errors and providing alternative data sources

const ERC20Abi = JSON.stringify(ERC20AbiJSON);

const getERC20Contracts = async (account: string, provider: Provider) => {
    // TODO: make 3box compatible with ethers.js providers

    if (!(
        window &&
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

    const web3 = await BlockchainProviderManager.getProvider(
        currentNetwork.platform,
        currentNetwork.network,
    );

    if (!web3) {
        return {
            balance: '0',
            data: {
                contract: '???',
                network: '???',
                platform: '???',
            },
            decimals: 0,
            icon: '/images/cryptokyberCurrency-icons/generic.svg',
            name: '???',
            price: '???',
            symbol: '???',
        };
    }

    const tokenContract = new Contract(contract, ERC20Abi, web3);

    const balance = await tokenContract.balanceOf(account);
    const name = await tokenContract.name();
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
        data: {
            contract,
            network: currentNetwork.network,
            platform: 'ethereum',
        },
        decimals,
        icon: `/images/cryptokyberCurrency-icons/${symbol}.svg`,
        name,
        price: '???',
        symbol,
    };
};

const sendEther = async (amount: string, to: string, fee: string) => {
    const state = store.getState();
    const account = accountAddressSelector(state);

    if (!(
        window &&
        (window as any).ethereum
    )) {
        return false;
    }

    const web3 = (window as any).ethereum;

    const params = [{
        from: account,
        gas: utils.bigNumberify(21000).toHexString(),
        gasPrice: utils.bigNumberify(fee).toHexString(),
        to,
        value: utils.bigNumberify(amount).toHexString(),
    }];

    await web3.sendAsync({
        from: account,
        method: 'eth_sendTransaction',
        params,
    });

    return true;
};

const sendToken = async (contract: string, amount: string, to: string, fee: string) => {
    const state = store.getState();
    const currentNetwork = currentNetworkSelector(state);

    const web3Signer = await BlockchainProviderManager.getSigner(
        currentNetwork.platform,
        currentNetwork.network,
    );

    if (!web3Signer) {
        return false;
    }

    const tokenContract = new Contract(contract, ERC20Abi, web3Signer);

    await tokenContract.transfer(to, utils.bigNumberify(amount), {
        gasPrice: utils.bigNumberify(fee),
    });

    return true;
};

export default {

    CryptoCurrencyData: {
        __resolveType: (object: any, context: any, info: any) => {
            if (object.contract) {
                return 'TokenData';
            }

            return 'NativeCurrencyData';
        },
    },

    Mutation: {
        addToken: async (schema: any, {
            contract,
        }: any) => {
            const state = store.getState();
            const account = accountAddressSelector(state);
            const currentNetwork = currentNetworkSelector(state);

            const web3 = await BlockchainProviderManager.getProvider(
                currentNetwork.platform,
                currentNetwork.network,
            );

            if (!web3) {
                return {
                    result: false,
                };
            }

            const tokenContract = new Contract(contract, ERC20Abi, web3);

            const totalSupply = await tokenContract.totalSupply();

            if (!totalSupply) {
                return {
                    result: false,
                };
            }

            // TODO: make 3box compatible with ethers.js providers

            if (!(
                window &&
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

            if (!containsAddress(erc20Contracts, contract)) {
                erc20Contracts.push(contract);

                await space.private.set('cryptoCurrencies', erc20Contracts);

                return {
                    result: true,
                };
            }

            return {
                result: false,
            };
        },

        sendCryptoCurrency: async (schema: any, {
            amount,
            kyberCurrencyOrToken,
            fee,
            to,
        }: any) => {
            let result = false;
            switch (kyberCurrencyOrToken) {
                case 'ethereum':
                    result = await sendEther(amount, to, fee);
                default:
                    result = await sendToken(kyberCurrencyOrToken, amount, to, fee);
            }

            return {
                result,
            };
        },
    },

    Query: {
        cryptoCurrencies: async (schema: any, {
            address,
        }: any) => {
            const cryptoCurrencies: Array<{
                balance: string;
                data: any;
                decimals: number;
                icon: string;
                name: string;
                price: string;
                symbol: string;
            }> = [];

            const state = store.getState();
            const account = accountAddressSelector(state);
            const currentNetwork = currentNetworkSelector(state);

            const web3 = await BlockchainProviderManager.getProvider(
                currentNetwork.platform,
                currentNetwork.network,
            );

            if (!web3) {
                return cryptoCurrencies;
            }

            const etherBalance = await web3.getBalance(account);

            const etherPriceResponse = await fetch(
                'https://api.etherscan.io/api?module=stats&action=ethprice&apikey=SKPYR2WCP5MM2RPAMQF2W4VIYVMKIBQU6J',
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                },
            );

            const etherPriceDataJSON = await etherPriceResponse.text();
            const etherPriceData = JSON.parse(etherPriceDataJSON);

            const etherPrice = etherPriceData.result.ethusd;

            cryptoCurrencies.push({
                balance: utils.formatEther(etherBalance),
                data: {
                    network: currentNetwork.network,
                    platform: 'ethereum',
                },
                decimals: 18,
                icon: '/images/cryptokyberCurrency-icons/eth.svg',
                name: 'Ether',
                price: etherPrice,
                symbol: 'ETH',
            });

            const erc20Contracts = await getERC20Contracts(account, web3);

            for (const token of erc20Contracts) {
                cryptoCurrencies.push(
                    await getERC20Data(account, token),
                );
            }

            return cryptoCurrencies;
        },

        cryptoCurrenciesOnExchange: async (schema: any, {}: any) => {
            const kyberCurrenciesResult = await fetch('https://api.kyber.network/currencies');
            const kyberCurrenciesJson = await kyberCurrenciesResult.text();
            const kyberCurrencies = JSON.parse(kyberCurrenciesJson);

            if (!kyberCurrencies) {
                return [];
            }

            const kyberRatesResult = await fetch('https://api.kyber.network/change24h');
            const kyberRatesJson = await kyberRatesResult.text();
            const kyberRates = JSON.parse(kyberRatesJson);

            if (!kyberRates) {
                return [];
            }

            const currencies = kyberCurrencies.data.map((kyberCurrency: any) => {
                const currency = {
                    address: kyberCurrency.address,
                    decimals: kyberCurrency.decimals,
                    name: kyberCurrency.name,
                    rateEth: '',
                    rateUsd: '',
                    symbol: kyberCurrency.symbol,
                };

                if (kyberRates[`ETH_${kyberCurrency.symbol}`]) {
                    currency.rateEth = kyberRates[`ETH_${kyberCurrency.symbol}`].rate_eth_now;
                    currency.rateUsd = kyberRates[`ETH_${kyberCurrency.symbol}`].rate_usd_now;
                }

                return currency;
            });

            return currencies;
        },
    },

};
