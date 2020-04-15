import boxes from 'account/profile/boxes';
import { Contract, utils } from 'ethers';
import fetchFee from 'network/utils/fetchFee';
import { containsAddress } from 'utils/ethereum';
import ERC20AbiJSON from './erc20.json';

// TODO: functions to interact with contracts, that are catching errors and providing alternative data sources

// TODO: get rid of platform/network for native and use cointype SLIP44 instead!
// platform of Token => cointype

// TODO: when clearing cache tokens are not be loaded again!

const ERC20Abi = JSON.stringify(ERC20AbiJSON);

const getERC20Contracts = async (account: string, signer: any) => {
    const box = await boxes.openBox(
        account,
        boxes.wrapEthersSigner(signer),
    );

    const space = await box.openSpace('totem');

    if (!space || !space.private) {
        return [];
    }

    let erc20Contracts: string[] | null = await space.private.get('cryptoCurrencies');

    if (!erc20Contracts) {
        erc20Contracts = [];
    }

    return erc20Contracts;
};

const getERC20Data = async (account: string, contract: string, provider: any, network: any) => {
    const defaultResult = {
        balance: '0',
        data: {
            contract: '???',
            network: '???',
            platform: '???',
            tokenStandard: '???',
        },
        decimals: 0,
        icon: '/images/cryptocurrency-icons/generic.svg',
        name: '???',
        price: '???',
        symbol: '???',
    };

    const tokenContract = new Contract(contract, ERC20Abi, provider);

    try {
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
                network,
                platform: 'ethereum',
                tokenStandard: 'ERC20',
            },
            decimals,
            icon: `/images/cryptocurrency-icons/${symbol}.svg`,
            name,
            price: '???',
            symbol,
        };
    } catch (error) {
        return defaultResult;
    }
};

const sendEther = async (
    amount: string,
    to: string,
    fee: string,
    signer: any,
) => {

    const params = {
        gasLimit: utils.bigNumberify(21000),
        gasPrice: utils.bigNumberify(fee),
        to,
        value: utils.bigNumberify(amount),
    };

    const result = await signer.sendTransaction(params);

    return result;
};

const sendToken = async (
    contract: string,
    amount: string,
    to: string,
    fee: string,
    signer: any,
) => {
    const tokenContract = new Contract(contract, ERC20Abi, signer);

    const result = await tokenContract.transfer(to, utils.bigNumberify(amount), {
        gasPrice: utils.bigNumberify(fee),
    });

    return result;
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
        addToken: async (
            schema: any,
            {
                contract,
            }: any,
            context: any,
        ) => {
            const account = await context.signer.getAddress();

            const tokenContract = new Contract(contract, ERC20Abi, context.provider);

            const totalSupply = await tokenContract.totalSupply();

            if (!totalSupply) {
                return {
                    result: false,
                };
            }

            const box = await boxes.openBox(
                account,
                boxes.wrapEthersSigner(context.signer),
            );

            const space = await box.openSpace('totem');

            if (!space || !space.private) {
                return [];
            }

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

        sendCryptoCurrency: async (
            schema: any,
            {
                amount,
                currencyOrToken,
                fee,
                to,
            }: any,
            context: any,
        ) => {
            let result: any = {};
            switch (currencyOrToken) {
                case 'ethereum':
                    result = await sendEther(amount, to, fee, context.signer);
                    break;
                default:
                    result = await sendToken(currencyOrToken, amount, to, fee, context.signer);
            }

            if (!result) {
                return {};
            }

            return {
                hash: result.hash,
                to: result.to,
                from: result.from,
                nonce: result.nonce,
                gasLimit: result.gasLimit.toString(),
                gasPrice: result.gasPrice.toString(),
                data: result.data,
                value: result.value.toString(),
                chainId: result.chainId,
                r: result.r,
                s: result.s,
                v: result.v,
                raw: result.raw,
            };
        },
    },

    Query: {
        cryptoCurrencies: async (
            schema: any,
            {
                address,
            }: any,
            context: any,
        ) => {
            const cryptoCurrencies: {
                balance: string;
                data: any;
                decimals: number;
                feeAverage: string;
                feeFast: string;
                feeSafeLow: string;
                icon: string;
                name: string;
                price: string;
                symbol: string;
            }[] = [];

            const account = await context.signer.getAddress();

            const etherBalance = await context.provider.getBalance(account);

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

            const etherFees = await fetchFee('ethereum', '1');

            const network = await context.provider.getNetwork();

            cryptoCurrencies.push({
                balance: utils.formatEther(etherBalance),
                data: {
                    network,
                    platform: 'ethereum',
                },
                decimals: 18,
                feeAverage: etherFees.average.toString(),
                feeFast: etherFees.fast.toString(),
                feeSafeLow: etherFees.safeLow.toString(),
                icon: '/images/cryptocurrency-icons/eth.svg',
                name: 'Ether',
                price: etherPrice,
                symbol: 'ETH',
            });

            const erc20Contracts = await getERC20Contracts(account, context.signer);

            for (const token of erc20Contracts) {
                cryptoCurrencies.push(
                    {
                        ...await getERC20Data(account, token, context.provider, network),
                        feeAverage: etherFees.average.toString(),
                        feeFast: etherFees.fast.toString(),
                        feeSafeLow: etherFees.safeLow.toString(),
                    },
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
