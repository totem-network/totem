import { accountAddressSelector, boxes } from 'account';
import { Contract, utils } from 'ethers';
import { Provider } from 'ethers/providers/abstract-provider';
import { BlockchainProviderManager, currentNetworkSelector } from 'network';
import { store } from 'state';
import { containsAddress } from 'utils/ethereum';
import ERC721Abi from './erc721';

// TODO: functions to interact with contracts, that are catching errors and providing alternative data sources

interface IDigitalAsset {
    contract: string;
    images: string[];
    name: string;
}

interface IDigitalAssetToken {
    description: string;
    asset: IDigitalAsset;
    id: string;
    image: string;
    name: string;
}

const updateERC721Contracts = async (account: string, space: any) => {
    const openSeaResult = await fetch(
        `https://api.opensea.io/api/v1/assets?owner=${account}`,
    );

    const openSeaDataJSON = await openSeaResult.text();
    const openSeaData = JSON.parse(openSeaDataJSON);

    const openSeaErc721Contracts = [];

    for (const asset of openSeaData.assets) {
        if (!containsAddress(openSeaErc721Contracts, asset.asset_contract.address)) {
            openSeaErc721Contracts.push(asset.asset_contract.address);
        }
    }

    let erc721Contracts: string[] | null = await space.private.get('digitalAssets');

    if (!erc721Contracts) {
        erc721Contracts = [];
    }

    let changed = false;
    for (const contract of openSeaErc721Contracts) {
        if (!containsAddress(erc721Contracts, contract)) {
            erc721Contracts.push(contract);
            changed = true;
        }
    }

    if (changed) {
        await space.private.set('digitalAssets', erc721Contracts);
    }

    return;
};

const getERC721Contracts = async (account: string, provider: Provider) => {
    // TODO: make 3box compatible with ethers.js providers

    if (!(
        (window as any).ethereum
    )) {
        return [];
    }

    const box = await boxes.openBox(account, (window as any).ethereum);

    const space = await box.openSpace('totem');

    await updateERC721Contracts(account, space);

    let erc721Contracts: string[] | null = await space.private.get('digitalAssets');

    if (!erc721Contracts) {
        erc721Contracts = [];
    }

    return erc721Contracts;
};

const getERC721Data = async (account: string, contract: string) => {
    const state = store.getState();
    const currentNetwork = currentNetworkSelector(state);

    const web3 = BlockchainProviderManager.getProvider(
        currentNetwork.platform,
        currentNetwork.network,
    );

    if (!web3) {
        return {
            contract,
            images: [],
            name: '???',
        };
    }

    const assetContract = new Contract(contract, ERC721Abi, web3);

    const name = await assetContract.name();

    if (!name) {
        return {
            contract,
            images: [],
            name: '???',
        };
    }

    const balance = await assetContract.balanceOf(account);

    let maxTokens = 4;
    if (balance < maxTokens) {
        maxTokens = balance;
    }

    const images: string[] = [];
    let queryOpenSea = false;
    for (let i = 0; i < maxTokens; i++) {
        try {
            const tokenId = await assetContract.tokenOfOwnerByIndex(account, i);
            const tokenURI = await assetContract.tokenURI(tokenId);

            const tokenMetaDataResponse = await fetch(tokenURI);
            const tokenMetaDataJSON = await tokenMetaDataResponse.text();

            const tokenMetaData = JSON.parse(tokenMetaDataJSON);

            images.push(tokenMetaData.image);
        } catch (error) {
            queryOpenSea = true;
        }
    }

    if (queryOpenSea) {
        const openSeaResult = await fetch(
            `https://api.opensea.io/api/v1/assets?owner=${account}&asset_contract_address=${contract}&limit=4`,
        );

        const openSeaDataJSON = await openSeaResult.text();
        const openSeaData = JSON.parse(openSeaDataJSON);

        for (const token of openSeaData.assets) {
            images.push(token.image_url);
        }
    }

    return {
        contract,
        images,
        name,
    };
};

const getERC721Tokens = async (account: string, contract: string) => {
    const state = store.getState();
    const currentNetwork = currentNetworkSelector(state);

    const web3 = BlockchainProviderManager.getProvider(
        currentNetwork.platform,
        currentNetwork.network,
    );

    if (!web3) {
        return [];
    }

    const assetContract = new Contract(contract, ERC721Abi, web3);

    const name = await assetContract.name();

    if (!name) {
        return [];
    }

    const balance = await assetContract.balanceOf(account);

    const tokenIds: string[] = [];
    let queryOpenSea = false;
    for (let i = 0; i < balance; i++) {
        try {
            const tokenId = await assetContract.tokenOfOwnerByIndex(account, i);
            tokenIds.push(tokenId);
        } catch (error) {
            queryOpenSea = true;
            break;
        }
    }

    if (queryOpenSea) {
        const openSeaResult = await fetch(
            `https://api.opensea.io/api/v1/assets?owner=${account}&asset_contract_address=${contract}`,
        );

        const openSeaDataJSON = await openSeaResult.text();
        const openSeaData = JSON.parse(openSeaDataJSON);

        for (const token of openSeaData.assets) {
            tokenIds.push(token.token_id);
        }
    }

    return tokenIds;
};

const getERC721TokenData = async (contract: string, tokenId: string) => {
    const state = store.getState();
    const currentNetwork = currentNetworkSelector(state);

    const web3 = BlockchainProviderManager.getProvider(
        currentNetwork.platform,
        currentNetwork.network,
    );

    if (!web3) {
        return {
            asset: {
                contract,
                images: [],
                name: '???',
            },
            description: '',
            id: tokenId,
            image: '',
            name: '???',
        };
    }

    const assetContract = new Contract(contract, ERC721Abi, web3);

    // TODO: implements ERC721MetaData interface?
    const name = await assetContract.name();

    if (!name) {
        return {
            asset: {
                contract,
                images: [],
                name: '???',
            },
            description: '',
            id: tokenId,
            image: '',
            name: '???',
        };
    }

    try {
        const tokenURI = await assetContract.tokenURI(tokenId);

        const tokenMetaDataResponse = await fetch(tokenURI);
        const tokenMetaDataJSON = await tokenMetaDataResponse.text();

        const tokenMetaData = JSON.parse(tokenMetaDataJSON);

        return {
            asset: {
                contract,
                images: [
                    tokenMetaData.image,
                ],
                name,
            },
            description: tokenMetaData.description,
            id: tokenId.toString(),
            image: tokenMetaData.image,
            name: tokenMetaData.name,
        };
    // tslint:disable-next-line:no-empty
    } catch (error) {}

    const openSeaResult = await fetch(
        `https://api.opensea.io/api/v1/asset/${contract}/${tokenId}/`,
    );

    const openSeaDataJSON = await openSeaResult.text();
    const openSeaData = JSON.parse(openSeaDataJSON);

    return {
        asset: {
            contract,
            images: [
                openSeaData.image_url,
            ],
            name,
        },
        description: openSeaData.name,
        id: tokenId,
        image: openSeaData.image_url,
        name: openSeaData.name,
    };
};

const sendToken = async (contract: string, token: string, to: string, fee: string) => {
    const state = store.getState();
    const account = accountAddressSelector(state);
    const currentNetwork = currentNetworkSelector(state);

    const web3Signer = BlockchainProviderManager.getSigner(
        currentNetwork.platform,
        currentNetwork.network,
    );

    if (!web3Signer) {
        return false;
    }

    const tokenContract = new Contract(contract, ERC721Abi, web3Signer);

    await tokenContract.transferFrom(account, to, token, {
        gasLimit: utils.bigNumberify('500000'),
        gasPrice: utils.bigNumberify(fee),
    });

    return true;
};

export default {

    Mutation: {
        addDigitalAsset: async (schema: any, {
            contract,
        }: any) => {
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

            const assetContract = new Contract(contract, ERC721Abi, web3);

            const balance = await assetContract.balanceOf(account);

            if (!balance) {
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

            let erc721Contracts: string[] | null = await space.private.get('digitalAssets');

            if (!erc721Contracts) {
                erc721Contracts = [];
            }

            if (!containsAddress(erc721Contracts, contract)) {
                erc721Contracts.push(contract);

                await space.private.set('digitalAssets', erc721Contracts);

                return {
                    result: true,
                };
            }

            return {
                result: false,
            };
        },

        sendDigitalAsset: async (schema: any, {
            contract,
            fee,
            to,
            token,
        }: any) => {
            return sendToken(contract, token, to, fee);
        },
    },

    Query: {
        digitalAsset: async (schema: any, {
            contract,
        }: any) => {
            const digitalAssetTokens: IDigitalAssetToken[] = [];

            const state = store.getState();
            const account = accountAddressSelector(state);
            const currentNetwork = currentNetworkSelector(state);

            const web3 = BlockchainProviderManager.getProvider(
                currentNetwork.platform,
                currentNetwork.network,
            );

            if (!web3) {
                return digitalAssetTokens;
            }

            const erc721Tokens = await getERC721Tokens(account, contract);

            for (const token of erc721Tokens) {
                digitalAssetTokens.push(
                    await getERC721TokenData(contract, token),
                );
            }

            return digitalAssetTokens;
        },

        digitalAssetByAccount: async (schema: any, {}: any) => {
            // TODO: add optional account field to digitalAsset
        },

        digitalAssets: async () => {
            const digitalAssets: IDigitalAsset[] = [];

            const state = store.getState();
            const account = accountAddressSelector(state);
            const currentNetwork = currentNetworkSelector(state);

            const web3 = BlockchainProviderManager.getProvider(
                currentNetwork.platform,
                currentNetwork.network,
            );

            if (!web3) {
                return digitalAssets;
            }

            const erc721Contracts = await getERC721Contracts(account, web3);

            for (const asset of erc721Contracts) {
                digitalAssets.push(
                    await getERC721Data(account, asset),
                );
            }

            return digitalAssets;
        },

        digitalAssetsByAccount: async (schema: any, {}: any) => {
            // TODO: add optional account field to digitalAsset
        },
    },
};
