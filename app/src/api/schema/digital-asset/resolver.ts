import { Contract, utils } from 'ethers';
import fetchFee from 'network/utils/fetchFee';
import { containsAddress } from 'utils/ethereum';
import ERC721Abi from './erc721';

// TODO: functions to interact with contracts, that are catching errors and providing alternative data sources

interface IDigitalAsset {
    contract: string;
    images: string[];
    name: string;
}

interface IDigitalAssetToken {
    asset: IDigitalAsset;
    description: string;
    feeAverage: string;
    feeFast: string;
    feeSafeLow: string;
    id: string;
    image: string;
    name: string;
}

const updateERC721Contracts = async (account: string, space: any) => {
    const openSeaResult = await fetch(
        `https://api.opensea.io/api/v1/assets?owner=${account}`,
    );

    const openSeaDataJson = await openSeaResult.text();
    const openSeaData = JSON.parse(openSeaDataJson);

    const openSeaErc721Contracts = [];

    for (const asset of openSeaData.assets) {
        if (!containsAddress(openSeaErc721Contracts, asset.asset_contract.address)) {
            openSeaErc721Contracts.push(asset.asset_contract.address);
        }
    }

    // let erc721Contracts: string[] | null = await space.private.get('digitalAssets');

    // if (!erc721Contracts) {
    //     erc721Contracts = [];
    // }

    // let changed = false;
    // for (const contract of openSeaErc721Contracts) {
    //     if (!containsAddress(erc721Contracts, contract)) {
    //         erc721Contracts.push(contract);
    //         changed = true;
    //     }
    // }

    // if (changed) {
    //     await space.private.set('digitalAssets', erc721Contracts);
    // }

    return;
};

const getERC721Contracts = async (account: string, signer: any) => {
    // const box = await boxes.openBox(
    //     account,
    //     boxes.wrapEthersSigner(signer),
    // );

    // const space = await box.openSpace('vinyai');

    // await updateERC721Contracts(account, space);

    // let erc721Contracts: string[] | null = await space.private.get('digitalAssets');

    // if (!erc721Contracts) {
    //     erc721Contracts = [];
    // }

    // return erc721Contracts;

    return [];
};

const getERC721Data = async (account: string, contract: string, signer: any) => {
    const assetContract = new Contract(contract, ERC721Abi, signer);

    let name = '???';
    try {
        name = await assetContract.name();
    } catch (error) {
        name = 'Error loading name';
    }

    let balance = 0;
    try {
        balance = await assetContract.balanceOf(account);
    } catch (error) {
        //
    }

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
            const tokenMetaDataJson = await tokenMetaDataResponse.text();

            const tokenMetaData = JSON.parse(tokenMetaDataJson);

            images.push(tokenMetaData.image);
        } catch (error) {
            queryOpenSea = true;
        }
    }

    if (queryOpenSea) {
        const openSeaResult = await fetch(
            `https://api.opensea.io/api/v1/assets?owner=${account}&asset_contract_address=${contract}&limit=4`,
        );

        const openSeaDataJson = await openSeaResult.text();
        const openSeaData = JSON.parse(openSeaDataJson);

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

const getERC721Tokens = async (account: string, contract: string, signer: any) => {
    const assetContract = new Contract(contract, ERC721Abi, signer);

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

        const openSeaDataJson = await openSeaResult.text();
        const openSeaData = JSON.parse(openSeaDataJson);

        for (const token of openSeaData.assets) {
            tokenIds.push(token.token_id);
        }
    }

    return tokenIds;
};

const getERC721TokenData = async (contract: string, tokenId: string, signer: any) => {
    const assetContract = new Contract(contract, ERC721Abi, signer);

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
        const tokenMetaDataJson = await tokenMetaDataResponse.text();

        const tokenMetaData = JSON.parse(tokenMetaDataJson);

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

    const openSeaDataJson = await openSeaResult.text();
    const openSeaData = JSON.parse(openSeaDataJson);

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

const sendToken = async (
    contract: string,
    token: string,
    to: string,
    fee: string,
    account: string,
    signer: any,
) => {
    const tokenContract = new Contract(contract, ERC721Abi, signer);

    await tokenContract.transferFrom(account, to, token, {
        gasLimit: utils.bigNumberify('500000'),
        gasPrice: utils.bigNumberify(fee),
    });

    return true;
};

export default {

    Mutation: {
        addDigitalAsset: async (
            schema: any,
            {
                contract,
            }: any,
            context: any,
        ) => {
            // const account = await context.signer.getAddress();

            // const assetContract = new Contract(contract, ERC721Abi, context.signer);

            // const balance = await assetContract.balanceOf(account);

            // if (!balance) {
            //     return {
            //         result: false,
            //     };
            // }

            // const box = await boxes.openBox(
            //     account,
            //     boxes.wrapEthersSigner(context.signer),
            // );

            // const space = await box.openSpace('vinyai');

            // let erc721Contracts: string[] | null = await space.private.get('digitalAssets');

            // if (!erc721Contracts) {
            //     erc721Contracts = [];
            // }

            // if (!containsAddress(erc721Contracts, contract)) {
            //     erc721Contracts.push(contract);

            //     await space.private.set('digitalAssets', erc721Contracts);

            //     return {
            //         result: true,
            //     };
            // }

            return {
                result: false,
            };
        },

        sendDigitalAsset: async (
            schema: any,
            {
                contract,
                fee,
                to,
                token,
            }: any,
            context: any,
        ) => {
            const account = await context.signer.getAddress();

            return sendToken(contract, token, to, fee, account, context.signer);
        },
    },

    Query: {
        digitalAsset: async (
            schema: any,
            {
                contract,
            }: any,
            context: any,
        ) => {
            const account = await context.signer.getAddress();

            const digitalAssetTokens: IDigitalAssetToken[] = [];

            const erc721Tokens = await getERC721Tokens(account, contract, context.signer);

            const etherFees = await fetchFee('ethereum', '1');

            for (const token of erc721Tokens) {
                digitalAssetTokens.push(
                    {
                        ...await getERC721TokenData(contract, token, context.signer),
                        feeAverage: etherFees.average.toString(),
                        feeFast: etherFees.fast.toString(),
                        feeSafeLow: etherFees.safeLow.toString(),
                    },
                );
            }

            return digitalAssetTokens;
        },

        digitalAssetByAccount: async (
            schema: any,
            {}: any,
            context: any,
        ) => {
            // TODO: add optional account field to digitalAsset
        },

        digitalAssets: async (
            schema: any,
            {}: any,
            context: any,
        ) => {
            const account = await context.signer.getAddress();

            const digitalAssets: IDigitalAsset[] = [];

            const erc721Contracts = await getERC721Contracts(account, context.signer);

            for (const asset of erc721Contracts) {
                digitalAssets.push(
                    await getERC721Data(account, asset, context.signer),
                );
            }

            return digitalAssets;
        },

        digitalAssetsByAccount: async (
            schema: any,
            {}: any,
            context: any,
        ) => {
            // TODO: add optional account field to digitalAsset
        },
    },
};
