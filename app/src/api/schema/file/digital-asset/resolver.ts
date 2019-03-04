import { accountAddressSelector, boxes } from 'account';
import { Contract, utils } from 'ethers';
import { Provider } from 'ethers/providers/abstract-provider';
import { BlockchainProviderManager, currentNetworkSelector } from 'network';
import { store } from 'state';
import ERC721Abi from './erc721';

interface IDigitalAsset {
    contract: string;
    images: string[];
    name: string;
}

interface IDigitalAssetToken {
    description: string;
    digitalAsset: IDigitalAsset;
    id: string;
    image: string;
    name: string;
}

const getERC721Contracts = async (account: string, provider: Provider) => {
    // TODO: make 3box compatible with ethers.js providers

    if (!(
        (window as any).ethereum
    )) {
        return [];
    }

    const box = await boxes.openBox(account, (window as any).ethereum);

    const space = await box.openSpace('totem');

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
    for (let i = 0; i < maxTokens; i++) {
        const tokenId = await assetContract.tokenOfOwnerByIndex(account, i);
        const tokenURI = await assetContract.tokenURI(tokenId);

        const tokenMetaDataResponse = await fetch(tokenURI);
        const tokenMetaDataJSON = await tokenMetaDataResponse.text();

        const tokenMetaData = JSON.parse(tokenMetaDataJSON);

        images.push(tokenMetaData.image);
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
    for (let i = 0; i < balance; i++) {
        const tokenId = await assetContract.tokenOfOwnerByIndex(account, i);

        tokenIds.push(tokenId);
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
            description: '',
            digitalAsset: {
                contract,
                images: [],
                name: '???',
            },
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
            description: '',
            digitalAsset: {
                contract,
                images: [],
                name: '???',
            },
            id: tokenId,
            image: '',
            name: '???',
        };
    }

    const tokenURI = await assetContract.tokenURI(tokenId);

    const tokenMetaDataResponse = await fetch(tokenURI);
    const tokenMetaDataJSON = await tokenMetaDataResponse.text();

    const tokenMetaData = JSON.parse(tokenMetaDataJSON);

    return {
        description: tokenMetaData.description,
        digitalAsset: {
            contract,
            images: [
                tokenMetaData.image,
            ],
            name,
        },
        id: tokenId,
        image: tokenMetaData.image,
        name: tokenMetaData.name,
    };
};

export default {
    addDigitalAsset: async (args: any) => {
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

        const assetContract = new Contract(args.contract, ERC721Abi, web3);

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

        // TODO: only add if not already added
        erc721Contracts.push(args.contract);

        space.private.set('digitalAssets', erc721Contracts);

        return {
            result: true,
        };
    },

    digitalAsset: async (args: any) => {
        const digitalAssetTokens: Array<{
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
            return digitalAssetTokens;
        }

        const erc721Tokens = await getERC721Tokens(account, args.contract);

        for (const token of erc721Tokens) {
            digitalAssetTokens.push(
                await getERC721TokenData(args.contract, token),
            );
        }

        return digitalAssetTokens;
    },

    digitalAssetByAccount: async (args: any) => {
        //
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

    digitalAssetsByAccount: async (args: any) => {
        //
    },
};
